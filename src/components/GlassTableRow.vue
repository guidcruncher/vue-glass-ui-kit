<template>
  <div class="ui-table-row">
    <div class="row-content">
      <slot></slot>
    </div>

    <div v-if="!isLast" class="separator-line"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  isLast: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="scss" scoped>
@use '@/styles/components/GlassTableRow' as *;
</style>
