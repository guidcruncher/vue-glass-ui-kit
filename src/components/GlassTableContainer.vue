<template>
  <div class="ui-table-container">
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({})
</script>

<style lang="scss" scoped>
@use '@/styles/components/GlassTableContainer' as *;
</style>
