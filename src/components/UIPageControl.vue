<template>
  <div class="ui-page-control-root">
    <div class="container">
      <div
        v-for="i in pages"
        :key="i"
        class="dot"
        :class="{ active: i - 1 === activePage }"
        @click="setPage(i - 1)"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  pages?: number
  currentPage?: number
}>()

const onBeforeMount = () => {}

const onMounted = () => {}

const onBeforeUnmount = () => {}

const onUnmounted = () => {}
</script>

<style scoped>
.ui-page-control-root {
  display: inline-block;
}
.ui-page-control-root .container {
  display: flex;
  gap: 8px;
  justify-content: center;
}
.ui-page-control-root .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--ios-text-tertiary);
  transition: all 0.2s;
  cursor: pointer;
}
.ui-page-control-root .dot.active {
  background: var(--ios-text-primary);
  transform: scale(1.1);
}
</style>
