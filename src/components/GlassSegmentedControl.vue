<template>
  <div class="glass-segmented-control" role="tablist">
    <button
      v-for="(option, index) in options"
      :key="index"
      :class="['segment-button', { 'is-active': modelValue === option.value }]"
      @click="selectOption(option.value)"
      role="tab"
      :aria-selected="modelValue === option.value"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
interface Option {
  label: string
  value: string | number
}

interface Props {
  modelValue: string | number
  options: Option[]
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const selectOption = (value: string | number) => {
  emit('update:modelValue', value)
}
</script>

<style lang="scss" scoped>
@use '@/styles/components/GlassSegmentedControl' as *;
</style>
