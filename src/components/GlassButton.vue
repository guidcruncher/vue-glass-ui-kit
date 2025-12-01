<template>
  <button
    :class="['glass-button', `variant-${variant}`]"
    :disabled="disabled"
    @click="emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
type ButtonVariant = 'default' | 'accent' | 'text' | 'selected' | 'destructive'

interface Props {
  variant?: ButtonVariant
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  disabled: false,
})

const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>

<style lang="scss" scoped>
@use '@/styles/components/GlassButton' as *;
</style>
