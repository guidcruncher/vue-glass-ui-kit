<template>
  <div
    :class="['glass-toggle', { 'is-checked': modelValue }]"
    @click="handleClick"
    role="switch"
    :aria-checked="modelValue.toString()"
  >
    <div class="glass-toggle-track">
      <div class="glass-toggle-thumb"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'toggle', value: boolean): void
}>()

const handleClick = () => {
  emit('update:modelValue', !props.modelValue)
  emit('toggle', props.modelValue)
}
</script>

<style lang="scss" scoped>
@use '@/styles/components/GlassToggle' as *;
</style>
