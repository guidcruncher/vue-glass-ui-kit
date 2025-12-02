<template>
  <div class="ui-glass-root">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const onBeforeMount = () => {}

const onMounted = () => {}

const onBeforeUnmount = () => {}

const onUnmounted = () => {}
</script>

<style scoped>
.ui-glass-root {
  background: var(--glass-bg);
  backdrop-filter: blur(25px) saturate(180%);
  -webkit-backdrop-filter: blur(25px) saturate(180%);
  border: 1px solid var(--glass-border);
  overflow: hidden;
  transition:
    background 0.3s,
    border-color 0.3s;
}
</style>
