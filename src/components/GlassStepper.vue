<template>
  <div class="glass-stepper">
    <GlassButton variant="text" @click="decrement" :disabled="modelValue <= min">
      <span aria-hidden="true">-</span>
    </GlassButton>

    <div class="stepper-value" :style="valueStyle">{{ modelValue }}</div>

    <GlassButton variant="text" @click="increment" :disabled="modelValue >= max">
      <span aria-hidden="true">+</span>
    </GlassButton>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import GlassButton from './GlassButton.vue'

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
@use '@/styles/components/GlassStepper' as *;
</style>
