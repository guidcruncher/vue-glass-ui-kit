<template>
  <label class="glass-checkbox-label">
    <input
      type="checkbox"
      :checked="modelValue"
      @change="emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
      @click="emit('click')"
      class="hidden-input"
    />
    <span :class="['custom-checkbox', { 'is-checked': modelValue }]">
      <svg v-if="modelValue" viewBox="0 0 24 24" class="check-icon">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </span>
    <span v-if="$slots.default" class="checkbox-text">
      <slot></slot>
    </span>
  </label>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'click'): void
}>()

const handleClick = () => {}
</script>

<style lang="scss" scoped>
@use '@/styles/components/GlassCheckbox' as *;
</style>
