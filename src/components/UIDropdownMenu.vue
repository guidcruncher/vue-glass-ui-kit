<template>
  <div class="ui-dropdown-wrapper" ref="triggerContainer">
    <div class="dropdown-trigger-wrapper" @click.stop="toggleMenu">
      <slot name="trigger" :isOpen="modelValue"></slot>
    </div>

    <Teleport to="body">
      <transition name="dropdown-fade">
        <div
          v-if="modelValue"
          class="dropdown-menu"
          :style="menuStyles"
          @click.stop
        >
          <slot></slot>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onUnmounted, watch } from 'vue'

const modelValue = defineModel({ type: Boolean, default: false })

const triggerContainer = ref(null)
const position = ref({ top: 0, right: 0 })

// Calculate styles based on position
const menuStyles = computed(() => ({
  top: `${position.value.top}px`,
  right: `${position.value.right}px`,
}))

const updatePosition = () => {
  if (!triggerContainer.value) return
  
  const rect = triggerContainer.value.getBoundingClientRect()
  
  // Align menu:
  // Top: just below the button + gap
  // Right: distance from right edge of window to right edge of button
  position.value = {
    top: rect.bottom + 8, 
    right: window.innerWidth - rect.right
  }
}

const toggleMenu = async () => {
  if (!modelValue.value) {
    // Before opening, calculate position
    updatePosition()
    modelValue.value = true
  } else {
    modelValue.value = false
  }
}

const closeMenu = () => {
  modelValue.value = false
}

// Handle Click Outside
const handleClickOutside = (event) => {
  // If menu is closed, do nothing
  if (!modelValue.value) return

  // Check if click is inside the trigger
  if (triggerContainer.value && triggerContainer.value.contains(event.target)) {
    return
  }

  // Note: Since menu is teleported, we rely on the @click.stop on the menu div 
  // to prevent this global listener from firing when clicking INSIDE the menu.
  // So if this fires, it means we clicked outside the menu AND outside the trigger.
  closeMenu()
}

// Close on Resize (prevents floating menu drifting away from button)
const handleResize = () => {
  if (modelValue.value) closeMenu()
}

// Watch for manual toggle via v-model (e.g. keyboard shortcut)
watch(modelValue, (isOpen) => {
  if (isOpen) {
    updatePosition()
  }
})

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('resize', handleResize)
  window.addEventListener('scroll', handleResize, true) // Capture scroll to close/reposition
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('scroll', handleResize, true)
})
</script>

<style lang="scss" scoped>
.ui-dropdown-wrapper {
  position: relative;
  display: inline-block;
}

/* Styles for the teleported menu.
  Note: scoped styles still apply to the teleported element 
  because Vue adds the data-v-xxx attribute to it.
*/
.dropdown-menu {
  position: fixed; /* Fixed is required for Teleport positioning */
  /* Top and Right are set via inline styles in JS */
  
  min-width: 200px;
  background: rgba(40, 40, 40, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 6px;
  z-index: 9999; /* Higher than the ImageViewer overlay (8000) */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
}

.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: all 0.2s ease-out;
}

.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
  visibility: hidden;
}

.dropdown-fade-enter-to,
.dropdown-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
  visibility: visible;
}
</style>
