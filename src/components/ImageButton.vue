<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  size?: number

  cornerRadius?: number

  disabled?: boolean
  imageurl?: string
}>()

const emit = defineEmits(['click'])

const size = computed(() => props.size ?? 60)
const radius = computed(() => (props.cornerRadius ?? 0.2) * size.value)

const handleClick = (event: any) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<template>
  <button
    :disabled="disabled"
    :style="{
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: `${radius}px`,
      padding: 0,
      border: 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      position: 'relative',
      overflow: 'hidden',
      outline: 'none',
      fontSize: 0,
      background: 'transparent',
      transition: 'transform 0.15s ease, box-shadow 0.15s ease',
    }"
    class="apple-app-icon-button"
    :class="{ disabled: disabled }"
    aria-label="App Launcher"
    v-bind="$attrs"
    @click="handleClick"
  >
    <!-- Inner content (icon) -->
    <div
      :style="{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: `${radius}px`,
        overflow: 'hidden',
      }"
    >
      <slot> <img v-if="imageurl" :src="imageurl" class="icon" /></slot>
    </div>

    <!-- Glossy overlay (gradient + highlight) -->
    <div
      :style="{
        position: 'absolute',
        inset: 0,
        borderRadius: `${radius}px`,
        background:
          'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)',
        pointerEvents: 'none',
      }"
    />

    <!-- Subtle inner shadow for depth -->
    <div
      :style="{
        position: 'absolute',
        inset: 0,
        borderRadius: `${radius}px`,
        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2)',
        pointerEvents: 'none',
      }"
    />

    <!-- Hover/Focus glow (outer) -->
    <div
      v-if="!disabled"
      :style="{
        position: 'absolute',
        inset: '-8px',
        borderRadius: `${radius + 8}px`,
        boxShadow: '0 0 0 0 transparent',
        transition: 'box-shadow 0.2s ease',
        pointerEvents: 'none',
      }"
      class="glow"
    />
  </button>
</template>

<style lang="scss" scoped>
@use '@/styles/components/ImageButton' as *;
</style>
