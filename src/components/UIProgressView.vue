<template>
  <div class="ui-progress-root">
    <div class="track">
      <div class="fill" :style="{ width: value + '%' }"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  value?: number
}>()

const onBeforeMount = () => {}

const onMounted = () => {}

const onBeforeUnmount = () => {}

const onUnmounted = () => {}
</script>

<style scoped>
.ui-progress-root {
  display: block;
  width: 100%;
}
.ui-progress-root .track {
  height: 4px;
  background: var(--system-gray5);
  border-radius: 2px;
  overflow: hidden;
}
.ui-progress-root .fill {
  height: 100%;
  background: var(--system-blue);
  transition: width 0.3s ease-out;
}
</style>
