<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    :placeholder="placeholder"
    :type="type"
    class="glass-input"
  />
</template>

<script setup lang="ts">
interface Props {
  modelValue: string | number
  placeholder?: string
  type?: string
}

withDefaults(defineProps<Props>(), {
  placeholder: '',
  type: 'text',
})

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<style lang="scss" scoped>
@use '@/styles/components/GlassInput' as *;
</style>
