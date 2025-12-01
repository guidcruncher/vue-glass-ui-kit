<template>
  <button
    :class="['glass-icon-button', { 'is-disabled': disabled }]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <div class="icon-wrapper">
      <slot name="icon">
        <img v-if="iconSrc" :src="iconSrc" :alt="label || 'icon'" class="button-icon" />
        <span v-else class="button-fallback-icon">{{ label ? label[0] : '?' }}</span>
      </slot>
    </div>
    <div v-if="label" class="icon-label">
      {{ label }}
    </div>
  </button>
</template>

<script setup lang="ts">
interface Props {
  iconSrc?: string
  label?: string
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  iconSrc: '',
  label: '',
  disabled: false,
})

defineEmits<{
  (e: 'click'): void
}>()
</script>

<style lang="scss" scoped>
@use '@/styles/components/GlassIconButton' as *;
</style>
