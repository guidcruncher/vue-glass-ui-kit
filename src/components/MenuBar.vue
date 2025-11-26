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
            >
              {{ menu.label }}
            </button>
            <div v-if="activeMenu === menu.id" class="dropdown-menu">
              <button
                v-for="(item, index) in menu.items"
                :key="index"
                class="dropdown-item"
                @click="handleMenuItemClick(menu.id, menu.label, item)"
              >
                {{ item }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
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

const toggleTheme = () => {
  isDarkTheme.value = !isDarkTheme.value
}

const toggleMenu = (menuId) => {
  if (activeMenu.value === menuId) {
    activeMenu.value = null
  } else {
    activeMenu.value = menuId
  }
}

const handleMenuItemClick = (menuId, menuLabel, itemText) => {
  emit('menu-action', {
    menuId: menuId,
    menuLabel: menuLabel,
    itemText: itemText,
  })
  activeMenu.value = null
}

const handleOutsideClick = (event) => {
  if (activeMenu.value && !event.target.closest('.menubar-content')) {
    activeMenu.value = null
  }
}

onMounted(() => {
  document.addEventListener('click', handleOutsideClick)
})

onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick)
})
</script>

<style lang="scss" scoped>
@use '@/styles/components/MenuBar' as *;
</style>
