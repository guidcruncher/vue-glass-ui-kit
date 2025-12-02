<template>
  <div class="ui-split-view">
    <div class="ui-split-view__master">
      <slot name="master"></slot>
    </div>

    <div class="ui-split-view__detail">
      <slot name="detail"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
// The logic is purely CSS/SCSS based on the media query. No complex script needed.
</script>

<style lang="scss" scoped>
.ui-split-view {
  display: flex;
  flex-direction: column; /* Mobile (small screen) stack by default */
  width: 100%;
  min-height: 100vh; // Ensure it takes full viewport height initially

  &__master {
    // Master pane visible on mobile, takes full width, but hidden by default
    // in the example structure for a "detail-first" mobile view.
    display: none;
  }

  &__detail {
    flex-grow: 1; /* Detail pane always visible, takes up remaining space */
    min-height: 100%;
  }

  // Tablet/Desktop Styles: Activate Split View at 768px (iOS/iPad standard)
  @media (min-width: 768px) {
    flex-direction: row; // Change to side-by-side

    &__master {
      display: block; // Master pane visible
      flex: 0 0 320px; // Fixed width for master pane
      max-width: 40%; // Max width constraint
      overflow-y: auto;
      // Styling from the original JS for separation
      background: var(--ios-background);
      border-right: 1px solid var(--ios-separator);
    }

    &__detail {
      flex-grow: 1;
      overflow-y: auto;
    }
  }
}
</style>
