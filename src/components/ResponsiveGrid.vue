<template>
  <div class="responsive-grid">
    <slot></slot>
  </div>
</template>

<script setup>
// We no longer need data, refs, or the GridItem import here.
</script>

<style lang="scss" scoped>
@use '@/styles/components/ResponsiveGrid' as *;
</style>
