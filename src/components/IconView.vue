<template>
  <svg
    v-if="iconPath"
    class="icon-view"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    v-html="iconPath"
  ></svg>
  <span v-else class="icon-view--missing">[Icon: {{ name }}]</span>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

interface Props {
  name: string // The key for the icon in the map (e.g., 'chevron.left')
}

const props = defineProps<Props>()

// --- Icon Definitions (Source from original JavaScript) ---
// NOTE: In a production app, move this map to a separate file (e.g., src/utils/icons.ts)
const icons: { [key: string]: string } = {
  'chevron.left': '<path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>',
  chevron: '<path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>',
  wifi: '<path d="M12.01 21.49L23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l11.63 14.49.01.01.01-.01z"/>',
  airplane:
    '<path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>',
  magnifyingglass:
    '<path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>',
  'star.fill':
    '<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>',
  'clock.fill':
    '<path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>',
  'person.2.fill':
    '<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>',
  'circle.grid.3x3.fill':
    '<path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"/>',
  'square.and.arrow.up':
    '<path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>',
  book: '<path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>',
  'square.on.square':
    '<path d="M21 17h-2V5l-8-2h10c1.1 0 2 .9 2 2v12zM3 21c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v12zm4-10h8v8H7v-8z"/>',
  'xmark.circle.fill':
    '<path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>',
}

const iconPath = computed(() => {
  return icons[props.name] || null
})
</script>

<style lang="scss" scoped>
.icon-view {
  // Base styles shared across most components (e.g., UIButton, UITabItem)
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
  fill: currentColor; // Allows the icon color to be set by the parent's text color
}

.icon-view--missing {
  color: var(--system-red);
  font-size: 10px;
}
</style>
