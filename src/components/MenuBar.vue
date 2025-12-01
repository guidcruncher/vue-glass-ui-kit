<template>
  <div :class="['menu-container']">
    <div class="menubar">
      <div class="menubar-content">
        <div class="menubar-left">
          <div
            v-for="menu in menus"
            :key="menu.id"
            class="menu-item-wrapper"
            @click.stop="toggleMenu(menu.id)"
          >
            <button
              class="menu-button"
              :class="{ active: activeMenu === menu.id }"
              :data-menu="menu.id"
              :ref="
                (el) => {
                  menuButtonRefs[menu.id] = el
                }
              "
            >
              {{ menu.label }}
            </button>

            <Teleport to="body">
              <div v-if="activeMenu === menu.id" class="dropdown-menu" :style="dropdownStyle">
                <button
                  v-for="(item, index) in getActiveMenuItems()"
                  :key="index"
                  class="dropdown-item"
                  :ref="
                    (el) => {
                      dropdownItemRefs[index] = el
                    }
                  "
                  @click="handleMenuItemClick(menu.id, menu.label, item)"
                >
                  {{ item }}
                </button>
              </div>
            </Teleport>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { getTheme } from '../composables/getTheme'

const emit = defineEmits(['menu-action'])

const props = defineProps({
  menus: {
    type: Array,
    required: true,
    default: () => [{ id: 'default', label: 'Default', items: ['Item 1', 'Item 2'] }],
    validator: (value) => value.every((menu) => menu.id && menu.label && Array.isArray(menu.items)),
  },
})

const { isDarkTheme } = getTheme()
const activeMenu = ref(null)
const menuButtonRefs = ref({})
const dropdownItemRefs = ref([])
const dropdownStyle = ref({})

// Helper to get the menu items for the currently active menu
const getActiveMenuItems = () => {
  const menu = props.menus.find((m) => m.id === activeMenu.value)
  return menu ? menu.items : []
}

// Function to calculate the width of the widest menu item
const calculateOptimalDropdownWidth = () => {
  // Return 0 if no items are rendered yet
  if (dropdownItemRefs.value.length === 0) return 0

  let maxWidth = 0
  dropdownItemRefs.value.forEach((el) => {
    if (el) {
      // offsetWidth gives the width including padding and border, which is ideal
      maxWidth = Math.max(maxWidth, el.offsetWidth)
    }
  })

  // Add a small buffer (e.g., 2 pixels) for safer display
  return maxWidth + 2
}

// Function to calculate and set dropdown position and width
const calculateDropdownGeometry = () => {
  const menuId = activeMenu.value
  if (!menuId) return

  const buttonElement = menuButtonRefs.value[menuId]
  if (!buttonElement) return

  const rect = buttonElement.getBoundingClientRect()
  const offsetFromTop = 8 // Matches the translateY(-8px) in CSS animation

  // 1. Calculate optimal width
  const optimalWidth = calculateOptimalDropdownWidth()

  // 2. Set position and width
  dropdownStyle.value = {
    position: 'absolute',
    left: `${rect.left}px`,
    top: `${rect.bottom + 4 - offsetFromTop}px`, // 4px is var(--spacing-xxs)
    width: `${optimalWidth}px`, // Apply the calculated width
  }

  // Clear the item refs after calculation to prevent memory leaks/stale references
  dropdownItemRefs.value = []
}

const toggleMenu = async (menuId) => {
  if (activeMenu.value === menuId) {
    activeMenu.value = null
    dropdownStyle.value = {}
  } else {
    activeMenu.value = menuId

    // 1. Wait for the dropdown wrapper to render
    await nextTick()

    // 2. Wait for the v-for loop to finish and populate dropdownItemRefs
    await nextTick()

    // 3. Calculate geometry based on collected refs
    calculateDropdownGeometry()
  }
}

const handleMenuItemClick = (menuId, menuLabel, itemText) => {
  emit('menu-action', {
    menuId: menuId,
    menuLabel: menuLabel,
    itemText: itemText,
  })
  activeMenu.value = null
  dropdownStyle.value = {}
}

const handleOutsideClick = (event) => {
  const isClickOnMenuBar = event.target.closest('.menubar-content')
  const isClickOnDropdown = event.target.closest('.dropdown-menu')

  if (activeMenu.value && !isClickOnMenuBar && !isClickOnDropdown) {
    activeMenu.value = null
    dropdownStyle.value = {}
  }
}

const handleResize = () => {
  // Recalculate position/width if the menu is open and the window resizes/scrolls
  if (activeMenu.value) {
    nextTick(calculateDropdownGeometry)
  }
}

onMounted(() => {
  document.addEventListener('click', handleOutsideClick)
  window.addEventListener('resize', handleResize)
  window.addEventListener('scroll', handleResize)
})

onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick)
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('scroll', handleResize)
})
</script>

<style lang="scss" scoped>
@use '@/styles/components/MenuBar' as *;
</style>
