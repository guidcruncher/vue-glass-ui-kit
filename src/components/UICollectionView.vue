<template>
  <div class="ui-collection-view">
    <div class="grid">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
// No script logic needed.
</script>

<style lang="scss" scoped>
.ui-collection-view {
  display: block;
  padding: 0 16px;
  margin-bottom: 24px;

  .grid {
    display: grid;
    // Creates a 2-column grid typical for Collection Views on small screens
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
}
</style>
