<template>
  <div class="glass-slider-labeled">
    <div class="slider-header">
      <div class="slider-label">
        <slot name="label">Intensity</slot>
      </div>
      <GlassPanel material="ultraThin" class="slider-value-display">
        {{ modelValue }}
      </GlassPanel>
    </div>

    <GlassSlider
      :model-value="modelValue"
      :min="min"
      :max="max"
      :step="step"
      @update:modelValue="emit('update:modelValue', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import GlassPanel from './GlassPanel.vue'
import GlassSlider from './GlassSlider.vue'

interface Props {
  modelValue: number
  min?: number
  max?: number
  step?: number
}

withDefaults(defineProps<Props>(), {
  min: 0,
  max: 100,
  step: 1,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()
</script>

<style lang="scss" scoped>
@use '@/styles/components/GlassSliderWithLabels' as *;
</style>
