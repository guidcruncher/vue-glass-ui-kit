<template>
  <div class="full-page-container" :style="getStyles">
    <header v-if="slots.header || slots.menubar" :class="getClass">
      <slot name="header"></slot>
      <slot name="menubar"></slot>
    </header>

    <main class="scrollable-content">
      <slot name="body"></slot>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useSlots, computed } from 'vue'
const slots = useSlots()

const getStyles = computed(() => {
  let size = 0
  if (slots.header && slots.menubar) {
    size = 124
  }
  if (slots.header || slots.menubar) {
    size = 54
  }
  return { 'var(--height-offset)': `${size}px` }
})

const getClass = computed(() => {
  if (slots.header && slots.menubar) {
    return ['sticky-header-menu']
  }
  if (slots.header || slots.menubar) {
    return ['sticky-header']
  }
  return []
})
</script>

<style lang="scss" scoped>
@use '@/styles/components/Container' as *;
</style>
