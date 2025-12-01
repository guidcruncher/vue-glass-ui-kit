<template>
  <div class="glass-dropdown" ref="dropdownRef" v-click-outside="closeDropdown">
    <GlassInput
      :modelValue="selectedLabel"
      type="text"
      :placeholder="placeholder"
      readonly
      @click="toggleDropdown"
      class="dropdown-trigger-input"
    />

    <GlassPanel v-if="isOpen" material="regular" class="dropdown-menu" :style="menuPositionStyle">
      <div
        v-for="option in options"
        :key="option.value"
        :class="['menu-item', { 'is-selected': modelValue === option.value }]"
        @click="selectOption(option.value)"
      >
        {{ option.label }}
      </div>
    </GlassPanel>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import GlassInput from './GlassInput.vue'
import GlassPanel from './GlassPanel.vue'

interface Option {
  label: string
  value: string | number
}

interface Props {
  modelValue: string | number | null
  options: Option[]
  placeholder?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'close'): void
}>()

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)
const menuPositionStyle = ref({})

const selectedLabel = computed(() => {
  const selectedOption = props.options.find((opt) => opt.value === props.modelValue)
  return selectedOption ? selectedOption.label : ''
})

const toggleDropdown = async () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    await nextTick()
    calculateMenuPosition()
  }
}

const selectOption = (value: string | number) => {
  emit('update:modelValue', value)
  emit('close')
  isOpen.value = false
}

const calculateMenuPosition = () => {
  if (!dropdownRef.value) return

  const rect = dropdownRef.value.getBoundingClientRect()
  const viewportHeight = window.innerHeight
  const menuHeight = 200

  let top = rect.height + 5
  let transform = 'translateY(0)'

  if (rect.bottom + menuHeight > viewportHeight && rect.top > menuHeight) {
    top = 'auto'
    transform = 'translateY(-100%) translateY(-5px)'
  }

  menuPositionStyle.value = {
    top: top === 'auto' ? 'auto' : `${top}px`,
    bottom: top === 'auto' ? `${rect.height + 5}px` : 'auto',
    transform: transform,
    width: `${rect.width}px`,
  }
}

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

const closeDropdown = () => {
  isOpen.value = false
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('resize', calculateMenuPosition)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('resize', calculateMenuPosition)
})

watch(isOpen, (newValue) => {
  if (newValue) {
    calculateMenuPosition()
  }
})
</script>

<style lang="scss" scoped>
@use '@/styles/components/GlassDropdown' as *;
</style>
