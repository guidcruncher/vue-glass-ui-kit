<template>
  <!-- 
    1. Class binding now uses the standard 'modelValue' prop.
    2. The click handler remains the same.
  -->
  <div :class="['ui-switch', { on: modelValue }]" @click="toggleSwitch">
    <div class="ui-switch__knob"></div>
  </div>
</template>

<script lang="ts" setup>
// Note: ref and watch are no longer needed as we rely purely on the prop/emit pattern.

// --- 1. Rename Prop to 'modelValue' ---
interface Props {
  /** * The state of the switch, automatically bound when using v-model 
   * e.g., <UISwitch v-model="mySetting" />
   */
  modelValue?: boolean 
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
})

// --- 2. Rename Emit Event to 'update:modelValue' ---
const emit = defineEmits<{
  // This is the required event for two-way binding with v-model
  (event: 'update:modelValue', value: boolean): void
}>()

/**
 * Toggles the switch state and emits the new value.
 */
const toggleSwitch = () => {
  // 3. Directly calculate the new state from props.modelValue 
  // and emit it back to the parent.
  const newState = !props.modelValue;
  emit('update:modelValue', newState)
}
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
    transition:
      transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
      width 0.2s,
      background 0.2s;
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
