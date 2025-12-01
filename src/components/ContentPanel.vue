<template>
  <div class="custom-panel" :style="panelStyle">
    <header class="panel-header">
      <slot name="header"></slot>
    </header>

    <main class="panel-body">
      <slot></slot>
    </main>

    <footer class="panel-footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  background: {
    type: String,
    required: true,
  },

  borderRadius: {
    type: [String, Number],
    default: 8,
  },
  color: {
    type: String,
    default: 'var(--ui-text-color)',
  },
})

const panelStyle = computed(() => {
  const isImage = props.background.includes('url(')

  return {
    '--panel-bg': isImage ? props.background : props.background,
    '--panel-radius': `${props.borderRadius}${typeof props.borderRadius === 'number' ? 'px' : ''}`,
    '--panel-color': props.color,

    ...(isImage && {
      'background-size': 'cover',
      'background-position': 'center',
    }),
  }
})
</script>

<style lang="scss" scoped>
@use '@/styles/components/ContentPanel' as *;
</style>
