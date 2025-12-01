<template>
  <div :class="['glass-validated-input', { 'has-error': errorMessage }]">
    <GlassInput
      :modelValue="modelValue"
      :type="type"
      :placeholder="placeholder"
      @update:modelValue="emit('update:modelValue', $event)"
      class="input-field"
    />
    <p v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import GlassInput from './GlassInput.vue'

interface Props {
  modelValue: string | number
  placeholder?: string
  type?: string
  errorMessage?: string
}

withDefaults(defineProps<Props>(), {
  placeholder: '',
  type: 'text',
  errorMessage: '',
})

defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()
</script>

<style lang="scss" scoped>
@use '@/styles/components/GlassValidatedInput' as *;
</style>
