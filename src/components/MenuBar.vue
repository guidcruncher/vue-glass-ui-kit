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
@use '../styles/mixins/_utilities' as *;
@use 'sass:math';
@use '../styles/mixins/glass' as *;

// ==========================================================
// 🎨 SCSS & CSS VARIABLE DEFINITIONS (Scoped within .menu-container)
// ==========================================================
.menu-container {
  // --- SCSS Constants ---
  $z-menubar: 1000;
  $transition-duration: 0.3s;
  $transition-timing: ease-in-out;

  --blur-radius-base: 20px;
  --theming-transition:
    background-color #{$transition-duration} #{$transition-timing},
    border-color #{$transition-duration} #{$transition-timing},
    box-shadow #{$transition-duration} #{$transition-timing},
    color #{$transition-duration} #{$transition-timing};

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .menubar {
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    height: 44px;
    color: var(--color-text-primary);
    @include apply-liquid-glass();
    z-index: $z-menubar;
    transition: var(--theming-transition);
  }

  .menubar-content {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    padding: 0 var(--spacing-m);
  }

  .menubar-left {
    display: flex;
    align-items: center;
    gap: var(--spacing-xl);
  }

  .menu-button {
    background: none;
    border: none;
    color: var(--color-label-primary);
    font-size: 14px;
    padding: var(--spacing-xxs) var(--spacing-xs);
    border-radius: var(--spacing-xs);
    cursor: pointer;
    transition: var(--theming-transition);
    font-weight: 500;
    text-align: left;

    &.active {
      background: var(--color-accent);
      color: var(--color-highlighted-text);
      box-shadow: 0 2px 4px var(--shadow-color);
    }
  }

  .menu-item-wrapper {
    position: relative;
  }
}

// Styles for the teleported dropdown (outside the menu-container scope)
@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdown-menu {
  // Position and width are controlled by JS via dropdownStyle
  min-width: 0; // Ensure it doesn't default to a large size before JS runs

  // Glass Effect
  @include apply-liquid-glass();
  background: var(--color-system-background-trans);
  color: var(--color-text-primary);
  border-radius: var(--spacing-s);
  box-shadow: 0 10px 40px var(--shadow-color);
  overflow: hidden;

  transform: translateY(-8px);
  opacity: 0;
  animation: slideIn 0.2s forwards;
  transition: var(--theming-transition);
  z-index: 2000;
}

.dropdown-item {
  // CRITICAL FIX: Forces text onto a single line for accurate width calculation
  white-space: nowrap !important;
  display: block;
  width: auto; // Allow content to determine item width

  background: none;
  border: none;
  text-align: left;
  padding: var(--spacing-xs) var(--spacing-m);
  font-size: 14px;
  color: var(--color-label-primary);
  cursor: pointer;
  transition: var(--theming-transition);
  z-index: 2000;

  &:hover {
    background: var(--color-accent);
    color: var(--color-highlighted-text);
  }
}
</style>
