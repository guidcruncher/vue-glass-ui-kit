<template>
  <div class="glass-progress-ring" :style="ringStyle">
    <svg :width="size" :height="size" viewBox="0 0 100 100">
      <circle
        class="progress-track"
        :cx="50"
        :cy="50"
        :r="radius"
        :stroke-width="strokeWidth"
      ></circle>
      <circle
        class="progress-fill"
        :cx="50"
        :cy="50"
        :r="radius"
        :stroke-width="strokeWidth"
        :style="progressStyle"
      ></circle>
    </svg>
    <div class="progress-content">
      <slot>{{ displayValue }}</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  progress: number
  size?: number
  strokeWidth?: number
}

const props = withDefaults(defineProps<Props>(), {
  size: 100,
  strokeWidth: 8,
})

const radius = computed(() => 50 - props.strokeWidth / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)

const progressStyle = computed(() => {
  const dashoffset = circumference.value - (props.progress / 100) * circumference.value
  return {
    strokeDasharray: circumference.value,
    strokeDashoffset: dashoffset,
    transition: 'stroke-dashoffset 0.6s ease-in-out',
  }
})

const displayValue = computed(() => `${Math.round(props.progress)}%`)

const ringStyle = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
}))
</script>

<style lang="scss" scoped>
@use '@/styles/components/GlassProgressRing' as *;
</style>
