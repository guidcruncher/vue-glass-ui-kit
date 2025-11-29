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

<style scoped>
.glass-image-container {
  /* Key glassmorphism properties */
  background: rgba(255, 255, 255, 0.15); /* Semi-transparent white background */
  backdrop-filter: blur(10px) saturate(180%); /* THE MAGIC: Blur the background behind it */
  -webkit-backdrop-filter: blur(10px) saturate(180%); /* For Safari support */

  /* Apple UI-style details */
  border-radius: 20px; /* Rounded corners */
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37); /* Subtle, deep shadow */
  border: 1px solid rgba(255, 255, 255, 0.18); /* Thin, light border for separation */

  /* Layout for the contained image */
  overflow: hidden; /* Important to keep the image within the rounded border */
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-content {
  /* Ensure the image fills the container while maintaining aspect ratio */
  width: 100%;
  height: 100%;
  object-fit: cover; /* This makes the image cover the container */
  /* You can apply a slight internal blur to the image itself if desired, 
     but this is often not part of the standard glassmorphism effect. */
}
</style>
