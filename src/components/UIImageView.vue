<template>
  <div class="ui-imageview-root" :style="{ borderRadius: radius }">
    <img :src="src" :alt="alt" @error="handleImageError" ref="imgElement" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  alt?: string
  radius?: string
}>()

const onBeforeMount = () => {}

const onMounted = () => {}

const onBeforeUnmount = () => {}

const onUnmounted = () => {}
</script>

<style scoped>
.ui-imageview-root {
  display: block;
  overflow: hidden;
  aspect-ratio: 16 / 9; /* Ensures a good default ratio */
}
.ui-imageview-root img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
