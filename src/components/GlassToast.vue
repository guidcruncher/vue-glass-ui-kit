<template>
  <Teleport to="body">
    <Transition name="toast-fade">
      <GlassPanel v-if="visible" material="ultraThin" class="glass-toast">
        <div class="toast-icon">
          <slot name="icon">✨</slot>
        </div>
        <div class="toast-message">{{ message }}</div>
      </GlassPanel>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, Teleport } from 'vue'
import GlassPanel from './GlassPanel.vue'

const visible = ref(false)
const message = ref('')
let timeout: number | null = null

const show = (msg: string, duration: number = 3000) => {
  if (timeout) clearTimeout(timeout)

  message.value = msg
  visible.value = true

  timeout = window.setTimeout(() => {
    visible.value = false
  }, duration)
}

defineExpose({ show })
</script>

<style lang="scss" scoped>
@use '@/styles/components/GlassToast' as *;
</style>
