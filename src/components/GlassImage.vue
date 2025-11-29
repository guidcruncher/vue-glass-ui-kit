<template>
  <div :style="containerStyles" class="glass-image-container">
    <img :src="src" :alt="alt" class="image-content" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Define the component's props
const props = withDefaults(
  defineProps<{
    src: string // The image source URL
    alt?: string // Alt text for the image
    width: string // The desired width (e.g., '300px', '100%')
    height: string // The desired height (e.g., '200px', '50vh')
  }>(),
  {
    alt: 'glass-image image',
  },
)

// A computed property to easily apply dynamic inline styles
const containerStyles = computed(() => ({
  width: props.width,
  height: props.height,
}))
</script>

<style lang="scss" scoped>
@use '@/styles/components/GlassImage' as *;
</style>
