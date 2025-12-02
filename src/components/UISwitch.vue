<template>
  <div :class="['ui-switch', { on: isChecked }]" @click="toggleSwitch">
    <div class="ui-switch__knob"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

interface Props {
  checked?: boolean; // Initial state (use v-model for two-way binding if needed)
}

const props = withDefaults(defineProps<Props>(), {
  checked: false,
});

const emit = defineEmits(['update:checked']);

const isChecked = ref(props.checked);

// Update internal state if prop changes
watch(
  () => props.checked,
  (newVal) => {
    isChecked.value = newVal;
  },
);

const toggleSwitch = () => {
  isChecked.value = !isChecked.value;
  emit('update:checked', isChecked.value);
};
</script>

<style lang="scss" scoped>
.ui-switch {
  width: 51px;
  height: 31px;
  background-color: var(--system-gray5);
  border-radius: 15.5px;
  position: relative;
  transition: background-color 0.3s ease;
  cursor: pointer;
  user-select: none;
  flex: 0 0 auto; // Prevent flex from resizing it

  &.on {
    background-color: var(--system-green);
  }

  &__knob {
    width: 27px;
    height: 27px;
    background: white;
    border-radius: 50%;
    position: absolute;
    top: 2px;
    left: 2px;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.2s, background 0.2s;
  }

  &.on &__knob {
    transform: translateX(20px);
  }

  // Active (click/touch) states for the 'squash' effect
  &:active &__knob {
    width: 32px;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(4px);
  }

  &.on:active &__knob {
    transform: translateX(15px); // Pushes the knob less far for the squash effect
  }
}
</style>
