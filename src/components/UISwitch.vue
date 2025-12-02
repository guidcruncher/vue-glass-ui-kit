<template>

<div class="ui-switch-root" :class="{ on: modelValue }" @click="toggle">
  <div class="knob"></div>
</div>

</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue?: boolean
}>()

const emit = defineEmits<{

  'update:modelValue': (payload?: any) => true

}>()


    const toggle = () => {
      emit('update:modelValue', !this.modelValue);
    }
  

const onBeforeMount = () => {}

const onMounted = () => {}

const onBeforeUnmount = () => {}

const onUnmounted = () => {}
</script>

<style scoped>

    .ui-switch-root {
      width: 51px; height: 31px;
      background-color: var(--system-gray5);
      border-radius: 15.5px;
      position: relative;
      transition: background-color 0.3s ease;
      cursor: pointer;
      flex-shrink: 0;
    }
    .ui-switch-root .knob {
      width: 27px; height: 27px;
      background: white; border-radius: 50%;
      position: absolute; top: 2px; left: 2px;
      box-shadow: 0 3px 8px rgba(0,0,0,0.15);
      transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.2s, background 0.2s;
    }
    .ui-switch-root.on { background-color: var(--system-green); }
    .ui-switch-root.on .knob { transform: translateX(20px); }
    .ui-switch-root:active .knob { width: 32px; background: rgba(255,255,255,0.9); backdrop-filter: blur(4px); }
    .ui-switch-root.on:active .knob { transform: translateX(15px); }
  
</style>
