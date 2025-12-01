<template>
  <div class="responsive-grid">
    <slot></slot>
  </div>
</template>

<script setup>
// We no longer need data, refs, or the GridItem import here.
</script>

<style scoped>
.responsive-grid {
  /* Core Grid Layout Properties */
  display: grid;

  /* Responsive Column Definition: The key for dynamic wrapping */
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));

  /* Spacing */
  gap: 24px;
  padding: 30px;

  /* Container Constraints */
  max-width: 100vw;
  margin: 0 auto;
}
</style>
