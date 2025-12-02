<template>
  <div class="ui-collectionview-root">
    <div class="grid"><slot></slot></div>
  </div>
</template>

<script setup lang="ts">
const onBeforeMount = () => {}

const onMounted = () => {}

const onBeforeUnmount = () => {}

const onUnmounted = () => {}
</script>

<style scoped>
.ui-collectionview-root {
  display: block;
  padding: 0 16px;
  margin-bottom: 24px;
}
.ui-collectionview-root .grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}
</style>
