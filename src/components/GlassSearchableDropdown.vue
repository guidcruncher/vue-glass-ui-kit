<template>
  <div class="glass-searchable-dropdown" ref="dropdownRef" v-click-outside="closeDropdown">
    <GlassInput
      :modelValue="filterText"
      type="text"
      :placeholder="placeholder"
      @update:modelValue="handleInput"
      @focus="isOpen = true"
      @keydown.down.prevent="navigate('down')"
      @keydown.up.prevent="navigate('up')"
      @keydown.enter.prevent="selectHighlighted"
      class="dropdown-trigger-input"
    />

    <GlassPanel v-if="isOpen" material="regular" class="dropdown-menu" :style="menuPositionStyle">
      <div v-if="filteredOptions.length === 0" class="menu-item no-results">No results found</div>
      <div
        v-else
        v-for="(option, index) in filteredOptions"
        :key="option.value"
        :class="[
          'menu-item',
          {
            'is-highlighted': index === highlightedIndex,
            'is-selected': modelValue === option.value,
          },
        ]"
        @click="selectOption(option.value)"
        @mouseenter="highlightedIndex = index"
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
const filterText = ref('')
const highlightedIndex = ref(-1)

const closeDropdown = () => {
  isOpen.value = false
}

const selectedLabel = computed(() => {
  const selectedOption = props.options.find((opt) => opt.value === props.modelValue)
  return selectedOption ? selectedOption.label : ''
})

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== null) {
      filterText.value = selectedLabel.value
    }
  },
  { immediate: true },
)

const filteredOptions = computed(() => {
  if (!filterText.value) {
    return props.options
  }
  const text = filterText.value.toLowerCase()
  return props.options.filter((option) => option.label.toLowerCase().includes(text))
})

const handleInput = (value: string) => {
  filterText.value = value
  isOpen.value = true
  highlightedIndex.value = filteredOptions.value.length > 0 ? 0 : -1
}

const selectOption = (value: string | number) => {
  const selectedOption = props.options.find((opt) => opt.value === value)
  if (selectedOption) {
    emit('update:modelValue', value)
    filterText.value = selectedOption.label
    isOpen.value = false
    emit('close')
  }
}

const navigate = (direction: 'up' | 'down') => {
  const maxIndex = filteredOptions.value.length - 1

  if (direction === 'down') {
    highlightedIndex.value = Math.min(highlightedIndex.value + 1, maxIndex)
  } else if (direction === 'up') {
    highlightedIndex.value = Math.max(highlightedIndex.value - 1, 0)
  }

  const menuEl = dropdownRef.value?.querySelector('.dropdown-menu')
  const itemEl = menuEl?.children[highlightedIndex.value + 1] as HTMLElement

  if (itemEl) {
    itemEl.scrollIntoView({ block: 'nearest' })
  }
}

const selectHighlighted = () => {
  if (highlightedIndex.value !== -1 && filteredOptions.value.length > 0) {
    selectOption(filteredOptions.value[highlightedIndex.value].value)
  } else if (filteredOptions.value.length === 1) {
    selectOption(filteredOptions.value[0].value)
  }
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
    nextTick(() => calculateMenuPosition())
  }
})
</script>

<style lang="scss" scoped>
@use '@/styles/components/GlassSearchableDropdown' as *;
</style>
