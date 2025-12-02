<template>
  <div class="ui-text-field-wrapper">
    <input
      type="text"
      :placeholder="placeholder"
      :value="modelValue"
      @input="handleInput"
      @focus="isFocused = true"
      @blur="isFocused = false"
    />
    <IconView
      v-if="clearButton && modelValue"
      name="xmark.circle.fill"
      class="clear-btn"
      @click="clearInput"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import IconView from './IconView.vue'

interface Props {
  placeholder?: string
  modelValue: string
  clearButton?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  clearButton: false,
})

const emit = defineEmits(['update:modelValue'])

const isFocused = ref(false)

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const clearInput = () => {
  emit('update:modelValue', '')
}
</script>

<style lang="scss" scoped>
.ui-text-field-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  position: relative; // Needed for the clear button alignment
  height: 22px; // Typical text field height in iOS

  input {
    width: 100%;
    border: none;
    background: transparent;
    font-size: 17px;
    color: var(--ios-text-primary);
    outline: none;
    padding: 0;
    margin: 0;
    font-family: inherit;
    height: 100%; // Match wrapper height
  }

  input::placeholder {
    color: var(--ios-text-tertiary);
  }

  .clear-btn {
    width: 16px;
    height: 16px;
    fill: var(--ios-text-tertiary);
    cursor: pointer;
    margin-left: 8px;
    flex-shrink: 0; // Prevent button from shrinking
    opacity: 0.8;
  }
}
</style>
