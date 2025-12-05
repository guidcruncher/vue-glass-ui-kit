<template>
  <div class="ui-stepper">
    <button
      class="ui-stepper-button"
      variant="text"
      @click="decrement"
      :disabled="modelValue <= min"
    >
      <span aria-hidden="true">-</span>
    </button>

    <div class="stepper-value" :style="valueStyle">{{ modelValue }}</div>

    <button
      class="ui-stepper-button"
      variant="text"
      @click="increment"
      :disabled="modelValue >= max"
    >
      <span aria-hidden="true">+</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue: number
  min?: number
  max?: number
  step?: number
}

const props = withDefaults(defineProps<Props>(), {
  min: 0,
  max: 100,
  step: 1,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

const increment = () => {
  const newValue = props.modelValue + props.step
  if (newValue <= props.max) {
    emit('update:modelValue', newValue)
  }
}

const decrement = () => {
  const newValue = props.modelValue - props.step
  if (newValue >= props.min) {
    emit('update:modelValue', newValue)
  }
}

const valueStyle = computed(() => {
  const maxDigits = String(props.max).length
  return {
    'min-width': `${maxDigits * 12 + 10}px`,
  }
})
</script>

<style lang="scss" scoped>
@use 'sass:math';
@use '../styles/_mixins' as *;

.ui-stepper {
  display: inline-flex;
  align-items: center;

  @include apply-liquid-glass(
    $material-opacity: 0.1,
    $blur: 8px
  ); // Used mixin to define glass style

  border-radius: 8px;
  padding: 4px;

  .ui-stepper-button {
    padding: 4px 8px;
    font-size: 18px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    min-width: 0;
    line-height: 1;
    border-radius: 6px;
  }

  .stepper-value {
    width: 40px;
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    color: var(--color-label-primary);
  }
}
</style>
