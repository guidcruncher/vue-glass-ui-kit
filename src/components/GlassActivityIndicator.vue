<template>
  <div class="glass-activity-indicator" :style="indicatorStyle">
    <svg :width="size" :height="size" viewBox="0 0 100 100">
      <circle class="indicator-ring" cx="50" cy="50" r="45" :stroke-width="strokeWidth" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  size?: number
  strokeWidth?: number
}

const props = withDefaults(defineProps<Props>(), {
  size: 32,
  strokeWidth: 4,
})

const indicatorStyle = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
}))
</script>

<style lang="scss" scoped>
@use '@/styles/components/GlassActivityIndicator' as *;
</style>
