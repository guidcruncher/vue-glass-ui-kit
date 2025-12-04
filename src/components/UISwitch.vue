<template>
  <div 
    :class="['ui-switch', { on: modelValue, disabled: disabled }]" 
    @click="!disabled && toggleSwitch"
  >
    <div class="ui-switch__knob"></div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  modelValue?: boolean
  disabled?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  disabled: false,
})

const emit = defineEmits<{ (event: 'update:modelValue', value: boolean): void }>()

const toggleSwitch = () => {
  if (!props.disabled) {
      const newState = !props.modelValue
      emit('update:modelValue', newState)
  }
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
  flex: 0 0 auto;

  &.on {
    background-color: var(--system-green);
  }
  
  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
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
      transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  &.on &__knob {
    transform: translateX(20px);
  }
}
</style>
