<template>
  <textarea
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    :placeholder="placeholder"
    :rows="rows"
    class="glass-textarea"
  ></textarea>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string
  placeholder?: string
  rows?: number
}

withDefaults(defineProps<Props>(), {
  placeholder: '',
  rows: 4,
})

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<style lang="scss" scoped>
@use '@/styles/components/GlassTextarea' as *;
</style>
