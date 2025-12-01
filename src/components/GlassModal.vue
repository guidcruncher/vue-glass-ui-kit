<template>
  <teleport to="body">
    <transition name="modal-fade">
      <div v-if="isVisible" class="glass-modal-overlay">
        <div class="glass-modal-box" :style="modalStyle">
          <header class="modal-header">
            <div class="window-controls">
              <button class="control-btn close" @click="handleClose"></button>

              <button class="control-btn minimize" @click="handleMinimize"></button>

              <button class="control-btn maximize" @click="handleClose"></button>
            </div>

            <div class="header-slot">
              <slot name="header"></slot>
            </div>
          </header>

          <div class="modal-body">
            <slot name="body"></slot>
          </div>

          <footer class="modal-footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { computed } from 'vue'
import { getTheme } from '../composables/getTheme'

const { isDark } = getTheme()

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
  width: {
    type: String,
    default: '600px',
  },
  height: {
    type: String,
    default: '400px',
  },
})

const emit = defineEmits(['update:isVisible', 'close'])

const modalStyle = computed(() => ({
  width: props.width,
  height: props.height,
}))

const modalClass = computed(() => {
  return ['modal-box', { dark: isDark.value }]
})

const handleClose = () => {
  emit('update:isVisible', false)
  emit('close')
}

const handleMinimize = () => {
  emit('update:isVisible', false)
}
</script>

<style lang="scss" scoped>
@use '@/styles/components/GlassModal' as *;
</style>
