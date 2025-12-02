<template>
  <div class="ui-image-view" :style="containerStyle">
    <img :src="imageUrl" :alt="altText" @error="handleImageError" />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

interface Props {
  src: string
  alt: string
  radius?: string
}

const props = withDefaults(defineProps<Props>(), {
  radius: '12px',
})

const imageUrl = ref(props.src)
const altText = ref(props.alt)

const fallbackImageUrl =
  '[https://placehold.co/600x338/C7C7CC/FFFFFF?text=Image+Unavailable](https://placehold.co/600x338/C7C7CC/FFFFFF?text=Image+Unavailable)'

const handleImageError = () => {
  if (imageUrl.value !== fallbackImageUrl) {
    imageUrl.value = fallbackImageUrl
    altText.value = `Placeholder for ${props.alt}`
  }
}

const containerStyle = computed(() => ({
  borderRadius: props.radius,
}))
</script>

<style lang="scss" scoped>
.ui-image-view {
  display: block;
  overflow: hidden;
  // Use a standard aspect ratio typical for content images
  aspect-ratio: 16 / 9;

  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
}
</style>
