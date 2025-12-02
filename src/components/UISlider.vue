<template>
  <div class="ui-slider-root">
    <div ref="track" class="track-container" @mousedown="startDrag" @touchstart="startDrag">
      <div class="fill" :style="{ width: value + '%' }"></div>
      <div class="knob" :style="{ left: value + '%' }"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue?: number
}>()

const emit = defineEmits<{
  'update:modelValue': (payload?: any) => true
}>()

const onBeforeMount = () => {}

const onMounted = () => {}

const onBeforeUnmount = () => {}

const onUnmounted = () => {}
</script>

<style scoped>
.ui-slider-root {
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
}
.track-container {
  position: relative;
  width: 100%;
  height: 4px;
  background: var(--system-gray5);
  border-radius: 2px;
  cursor: pointer;
  touch-action: none;
}
.fill {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background: var(--system-blue);
  border-radius: 2px;
}
.knob {
  position: absolute;
  top: 50%;
  width: 28px;
  height: 28px;
  background: white;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.track-container:active .knob {
  transform: translate(-50%, -50%) scale(1.3);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
}
</style>
