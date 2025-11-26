<template>
  <div class="glass-v-stack" :style="stackStyle">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  spacing?: number
  alignment?: 'start' | 'center' | 'end'
}

const props = withDefaults(defineProps<Props>(), {
  spacing: 8,
  alignment: 'start',
})

const stackStyle = computed(() => ({
  gap: `${props.spacing}px`,
  alignItems: props.alignment,
}))
</script>

<style lang="scss" scoped>
@use '@/styles/components/GlassVStack' as *;
</style>
