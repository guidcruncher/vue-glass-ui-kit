<template>
  <button :class="['ui-button', variant]" @click="handleClick">
    <IconView v-if="icon" :name="icon" class="ui-button__icon" />
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
// Assuming IconView is a component that renders the appropriate SVG based on the 'name' prop.
import IconView from '@/components/IconView.vue'

type ButtonVariant = 'filled' | 'tinted' | 'gray' | 'plain' | 'icon' | 'prominentGlass' | 'text'

interface Props {
  variant?: ButtonVariant
  icon?: string // e.g., 'chevron.left'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'filled',
  icon: undefined,
})

const emit = defineEmits(['click'])

const handleClick = (event: MouseEvent) => {
  emit('click', event)
}
</script>

<style lang="scss" scoped>
.ui-button {
  font-family: inherit;
  font-size: 17px;
  font-weight: 400;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  padding: 12px 20px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  user-select: none;
  background: transparent;

  &:active {
    transform: scale(0.96);
    opacity: 0.8;
  }

  // --- Variants ---
  &.filled {
    background: var(--system-blue);
    color: white;
  }

  &.tinted {
    // SCSS supports color-mix natively, but using var() fallback for theme tokens
    background: var(--system-gray5); // Fallback for tinted look in SCSS
    color: var(--system-blue);
  }

  &.gray {
    background: var(--system-gray5);
    color: var(--system-blue);
  }

  &.plain,
  &.text {
    color: var(--system-blue);
    padding: 8px 10px; // Slightly less padding for plain/text
    width: auto;
  }

  &.icon {
    padding: 8px;
    width: 44px;
    height: 44px;
    color: var(--system-blue);
    border-radius: 50%;
  }

  &.prominentGlass {
    background: var(--glass-bg);
    color: var(--system-blue);
    font-weight: 600;
    backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid var(--glass-border);
    box-shadow: var(--glass-shadow);
  }

  &__icon {
    width: 20px;
    height: 20px;
    fill: currentColor;
  }
}
</style>
