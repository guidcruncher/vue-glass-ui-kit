<template>
  <GlassPanel :material="material" :border-radius="borderRadius" class="glass-card">
    <div v-if="$slots.header" class="glass-card-header">
      <slot name="header"></slot>
    </div>
    <div class="glass-card-content">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" class="glass-card-footer">
      <slot name="footer"></slot>
    </div>
  </GlassPanel>
</template>

<script setup lang="ts">
import GlassPanel from './GlassPanel.vue'

type Material = 'ultraThin' | 'regular' | 'thick'

interface Props {
  material?: Material
  borderRadius?: string
}

withDefaults(defineProps<Props>(), {
  material: 'regular',
  borderRadius: '16px',
})
</script>

<style lang="scss" scoped>
@use '@/styles/components/GlassCard' as *;
</style>
