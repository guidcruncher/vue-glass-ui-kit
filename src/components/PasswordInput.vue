<template>
  <div class="glass-password-input-container">
    <div>
      <input
        v-if="!isVisible"
        :value="modelValue"
        @input="handleInput"
        :placeholder="placeholder"
        type="password"
        class="glass-input"
      />
      <input
        v-else
        :value="modelValue"
        @input="handleInput"
        :placeholder="placeholder"
        type="text"
        class="glass-input"
      />
    </div>
    <div v-if="toggleEnabled" :class="{ toggled: isVisible }" @click="toggleVisibility">
      <small>
        <span v-if="isVisible" title="Hide Password">Hide Password</span>
        <span v-else title="Show Password">Show Password</span>
      </small>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  modelValue: string

  placeholder?: string

  toggleEnabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  toggleEnabled: true,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const isVisible = ref(false)

const toggleVisibility = () => {
  if (props.toggleEnabled) {
    isVisible.value = !isVisible.value
  }
}

const handleInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  emit('update:modelValue', value)
}
</script>

<style lang="scss" scoped>
@use '@/styles/components/PasswordInput' as *;
</style>
~
