<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  size?: string | number

  variant?: string

  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const buttonClasses = computed(() => {
  return ['glass-image-button', props.variant ? `variant-${props.variant}` : '']
    .filter(Boolean)
    .join(' ')
})

const buttonStyle = computed(() => {
  const sizeValue = typeof props.size === 'number' ? `${props.size}px` : props.size

  return {
    '--button-size': sizeValue,
  }
})

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<template>
  <button :class="buttonClasses" :style="buttonStyle" :disabled="disabled" @click="handleClick">
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
@use '@/styles/components/GlassImageButton' as *;
</style>
