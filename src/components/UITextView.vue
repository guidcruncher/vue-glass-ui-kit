<template>
  <div class="ui-text-view">
    <textarea
      :rows="rows"
      :placeholder="placeholder"
      :value="modelValue"
      @input="handleInput"
    ></textarea>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  placeholder?: string
  rows?: number | string
  modelValue: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Enter text here...',
  rows: 3,
})

const emit = defineEmits(['update:modelValue'])

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
}
</script>

<style lang="scss" scoped>
.ui-text-view {
  display: block;
  width: 100%;
  padding: 10px 0;

  textarea {
    width: 100%;
    border: none;
    background: transparent;
    font-size: 17px;
    color: var(--ios-text-primary);
    outline: none;
    resize: none;
    padding: 0;
    font-family: inherit;
    line-height: 1.4;
  }

  textarea::placeholder {
    color: var(--ios-text-tertiary);
  }
}
</style>
