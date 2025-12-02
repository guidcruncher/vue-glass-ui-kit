<template>
  <div class="ui-table-root">
    <div class="table-container">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const onBeforeMount = () => {}

const onMounted = () => {}

const onBeforeUnmount = () => {}

const onUnmounted = () => {}
</script>

<style scoped>
.ui-table-root {
  display: block;
  margin-bottom: 24px;
}
.table-container {
  background: var(--ios-card-bg);
  border-radius: 12px;
  overflow: hidden;
  margin: 0 16px;
}
</style>
