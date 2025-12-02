<template>
  <div class="ui-textview-root">
    <textarea
      :rows="rows"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue?: string
  placeholder?: string
  rows?: any
}>()

const emit = defineEmits<{
  'update:modelValue': (payload?: any) => true
}>()

const onBeforeMount = () => {}

const onMounted = () => {}

const onBeforeUnmount = () => {}

const onUnmounted = () => {}
</script>

<style scoped>
.ui-textview-root {
  display: block;
  width: 100%;
  padding: 10px 0;
}
.ui-textview-root textarea {
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
.ui-textview-root textarea::placeholder {
  color: var(--ios-text-tertiary);
}
</style>
