<template>
  <div class="glass-slider">
    <input
      type="range"
      :min="min"
      :max="max"
      :step="step"
      :value="modelValue"
      @input="handleInput"
      class="range-input"
      :style="trackStyle"
      list=""
    />
    <datalist v-if="ticks">
      <option v-for="tick in ticks" :value="tick"></option>
    </datalist>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue: number
  min?: number
  max?: number
  step?: number
  ticks?: array
}

const props = withDefaults(defineProps<Props>(), {
  min: 0,
  max: 100,
  step: 1,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
  (e: 'change', value: number): void
}>()

const handleInput = (event: Event) => {
  const value = parseFloat((event.target as HTMLInputElement).value)
  emit('update:modelValue', value)
  emit('change', value)
}

const trackStyle = computed(() => {
  const range = props.max - props.min
  const normalizedValue = (props.modelValue - props.min) / range
  const percentage = normalizedValue * 100

  return {
    '--slider-progress': `${percentage}%`,
  }
})
</script>

<style lang="scss" scoped>
@use '@/styles/components/GlassSlider' as *;
</style>
