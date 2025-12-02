<template>
  <button :class="variant" class="ui-button-root">
    <Icon v-if="icon" :name="icon" />
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  variant?: string
  icon?: string
}>()

import Icon from './Icon.vue'

const onBeforeMount = () => {}

const onMounted = () => {}

const onBeforeUnmount = () => {}

const onUnmounted = () => {}
</script>

<style scoped>
.ui-button-root {
  font-family: inherit;
  font-size: 17px;
  font-weight: 400;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  padding: 12px 20px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  user-select: none;
  background: transparent;
}
.ui-button-root:active {
  transform: scale(0.96);
  opacity: 0.8;
}

.ui-button-root .icon {
  width: 20px;
  height: 20px;
  fill: currentColor;
}

/* Variants */
.filled {
  background: var(--system-blue);
  color: white;
}
.tinted {
  background: color-mix(in srgb, var(--system-blue), transparent 85%);
  color: var(--system-blue);
}
.gray {
  background: var(--system-gray5);
  color: var(--system-blue);
}
.text {
  color: var(--system-blue);
  padding: 8px 0;
}
.icon {
  padding: 8px;
  width: 44px;
  height: 44px;
  color: var(--system-blue);
  width: auto;
  height: auto;
}
.icon:hover {
  opacity: 0.7;
}

.prominentGlass {
  background: var(--glass-bg);
  color: var(--system-blue);
  font-weight: 600;
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid var(--glass-border);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}
</style>
