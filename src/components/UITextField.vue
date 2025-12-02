<template>

<div class="ui-textfield-wrapper">
  <input 
    type="text" 
    :placeholder="placeholder" 
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    class="ui-textfield-input"
  >
  <Icon 
    v-if="showClearButton" 
    name="xmark.circle.fill" 
    class="clear-btn" 
    @click="clearInput"
  />
</div>

</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue?: string
  placeholder?: string
  clearButton?: any
}>()

const emit = defineEmits<{

  'update:modelValue': (payload?: any) => true

}>()

import Icon from './Icon.vue'


    const clearInput = () => {
        emit('update:modelValue', '');
    }
  


    const showClearButton = () => {
        return this.clearButton && this.modelValue.length > 0;
    }
  

const onBeforeMount = () => {}

const onMounted = () => {}

const onBeforeUnmount = () => {}

const onUnmounted = () => {}
</script>

<style scoped>

    .ui-textfield-wrapper {
        position: relative; display: flex; align-items: center; width: 100%;
        height: 22px; /* Set fixed height to center align in cell */
    }
    .ui-textfield-input {
        width: 100%; border: none; background: transparent;
        font-size: 17px; color: var(--ios-text-primary);
        outline: none; padding: 0; margin: 0;
        height: 100%;
    }
    .ui-textfield-input::placeholder { color: var(--ios-text-tertiary); }
    .clear-btn {
        width: 16px; height: 16px; fill: var(--ios-text-tertiary);
        cursor: pointer; margin-left: 8px; flex-shrink: 0;
    }
  
</style>
