<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="cell">
    <div class="cell-content">
      <slot name="icon"></slot>
    </div>
    
    <div class="cell-label">
      {{ label }}
    </div>
  </div>
</template>

<style scoped>
/* NOTE: The styles for .collection-view, .cell-content, and .cell-label 
   are intended to be defined in UICollectionView.vue and your global CSS variables.
   Only the structural styles necessary for this item are kept here if not
   duplicated in UICollectionView.vue. Since UICollectionView.vue provided
   all necessary component styles (cell, cell-content, cell-label), 
   we will minimize duplication and only keep the necessary container styles for .cell. */

.cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease;
  /* Ensure the item is responsive */
  width: 100%;
  max-width: 100px;
}

/* This is the styling for the icon block itself, 
   which relies on the theme variables defined in your global scope. */
.cell-content {
  width: 80px;
  height: 80px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px var(--color-cell-shadow);
  margin-bottom: 8px;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.cell-content:hover {
  transform: scale(0.95);
}

.cell:active .cell-content {
  transform: scale(0.9);
}

.cell-label {
  font-size: 13px;
  color: var(--color-cell-label);
  text-align: center;
  font-weight: 400;
  /* Optional: Prevent label wrapping unless necessary, and handle ellipsis */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 90px;
}
</style>
