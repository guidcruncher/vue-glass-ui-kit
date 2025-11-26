<template>
  <div class="glass-progress-bar">
    <div class="progress-track">
      <div class="progress-fill" :style="fillStyle"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  progress: number
}

const props = withDefaults(defineProps<Props>(), {
  progress: 0,
})

const fillStyle = computed(() => ({
  width: `${Math.min(100, Math.max(0, props.progress))}%`,
}))
</script>

<style lang="scss" scoped>
@use '@/styles/components/GlassProgressBar' as *;
</style>
