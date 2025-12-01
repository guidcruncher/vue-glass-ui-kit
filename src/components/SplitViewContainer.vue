<template>
  <div :class="['split-view-container', { collapsed: collapsed }]">
    <div
      class="primary-panel"
      :style="{ width: primaryWidth, flexBasis: primaryWidth }"
      v-show="!collapsed"
    >
      <slot name="primary"></slot>
    </div>
    <div class="secondary-panel">
      <slot name="secondary"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

const props = defineProps({
  // Initial width of the primary panel (e.g., '300px' or '30%')
  initialWidth: {
    type: String,
    default: '300px',
  },
  // Minimum width for the primary panel
  minWidth: {
    type: Number,
    default: 150,
  },
  collapsed: {
    type: Boolean,
    default: false,
  },
})

const primaryWidth = ref(props.initialWidth)
</script>

<style lang="scss">
@use '@/styles/components/SplitViewContainer' as *;
</style>
