<template>
  <div v-if="animating" class="spinner">
    <div v-for="i in 12" :key="i" class="bar" :style="barStyle(i)"></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  animating?: boolean
}>()

const barStyle = (i) => {
  return {
    transform: `rotate(${i * 30}deg) translate(0, -140%)`,
    animationDelay: `-${1.2 - i * 0.1}s`,
  }
}

const onBeforeMount = () => {}

const onMounted = () => {}

const onBeforeUnmount = () => {}

const onUnmounted = () => {}
</script>

<style scoped>
.spinner {
  width: 20px;
  height: 20px;
  position: relative;
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
}
.bar {
  width: 8%;
  height: 25%;
  background: var(--ios-text-secondary);
  position: absolute;
  left: 46%;
  top: 40%;
  border-radius: 5px;
  opacity: 0.25;
  animation: fade 1s linear infinite;
}
@keyframes fade {
  from {
    opacity: 1;
  }
  to {
    opacity: 0.25;
  }
}
</style>
