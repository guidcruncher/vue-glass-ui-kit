<template>
  <div :class="colClasses">
    <slot></slot>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  col: {
    type: [Number, String],
    default: 12,
    validator: (val) => val >= 1 && val <= 12,
  },
  colMd: {
    type: [Number, String],
    default: null,
    validator: (val) => val === null || (val >= 1 && val <= 12),
  },
  colLg: {
    type: [Number, String],
    default: null,
    validator: (val) => val === null || (val >= 1 && val <= 12),
  },
  safeArea: {
    type: Boolean,
    default: false,
  },
})

const colClasses = computed(() => {
  const classes = []

  if (props.col) {
    classes.push(`col-${props.col}`)
  }
  if (props.colMd) {
    classes.push(`col-md-${props.colMd}`)
  }
  if (props.colLg) {
    classes.push(`col-lg-${props.colLg}`)
  }
  if (props.safeArea) {
    classes.push('safe-area')
  }

  return classes.join(' ')
})
</script>
