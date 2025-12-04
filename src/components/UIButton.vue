<template>
  <button :class="['ui-button', variant]" :disabled="disabled" @click="handleClick">
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
  /** New: Controls the disabled state of the button */
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'filled',
  icon: undefined,
  disabled: false,
})

const emit = defineEmits(['click'])

const handleClick = (event: MouseEvent) => {
  // The native disabled attribute prevents the click event, but guarding here for consistency
  if (!props.disabled) {
    emit('click', event)
  }
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

  &:active:not(:disabled) {
    transform: scale(0.96);
    opacity: 0.8;
  }

  // NEW: Disabled State Styling
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5; /* Fade out the button */
    transform: none; /* Prevent the active scale effect */
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
    color: var(--ios-text-primary);
  }

  &.plain,
  &.text {
    color: var(--system-blue);
    padding: 8px 10px; // Slightly less padding for plain/text
    width: auto;
  }

  // High contrast button for prominent actions
  &.prominentGlass {
    background: var(--prominent-glass-bg);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    color: white;
    font-weight: 600;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .ui-button__icon {
    width: 20px;
    height: 20px;
    fill: currentColor; // Icon color matches text color
  }
}
</style>
