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
@use '../styles/mixins/_utilities' as *;
@use 'sass:math';
@use '../styles/mixins/glass' as *;

$transition-speed: 0.3s;

.split-view-container {
  // Use 'flex' for the main container
  display: flex;
  height: 100%;
  width: 100%;
  overflow: hidden; // Important for containing panels

  // --- Panel Styling ---
  .primary-panel,
  .secondary-panel {
    overflow-y: scroll; // Allow internal scrolling
    transition: all $transition-speed ease-in-out;
    // Set a default minimum size for the detail view
    min-width: 0;
  }

  // Primary Panel (Master/Sidebar)
  .primary-panel {
    @include apply-liquid-glass();
    flex-shrink: 0; // Prevent primary panel from shrinking
  }

  // Secondary Panel (Detail/Content)
  .secondary-panel {
    flex-grow: 1; // Allows the secondary panel to take up all remaining space
    position: relative; // For positioning the expand button
    overflow: auto;
  }

  &.collapsed {
    .primary-panel {
      position: absolute;
      height: 100%;
      z-index: 100;
      box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    }
  }

  // --- Toggle Buttons ---
  .collapse-btn,
  .expand-btn {
    position: absolute;
    top: 10px;
    z-index: 20;
    // Basic button styling
    background: none;
    border: none;
    color: #007aff; // A common iOS-like blue
    cursor: pointer;
    padding: 5px;
  }

  .collapse-btn {
    right: 5px; // Position on the primary panel
  }

  .expand-btn {
    left: 5px; // Position on the secondary panel when collapsed
  }
}
</style>
