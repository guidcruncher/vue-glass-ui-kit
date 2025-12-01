<template>
  <div class="picker-wrapper">
    <div
      ref="viewportEl"
      class="picker-viewport"
      @mousedown="handleStart"
      @touchstart.prevent="handleStart"
      @touchmove="handleMove"
      @touchend="handleEnd"
      @touchcancel="handleEnd"
    >
      <ul class="picker-list" :style="listStyle">
        <template v-for="(item, index) in items" :key="index">
          <li
            :ref="(el) => setItemRef(el)"
            :class="['picker-item', { 'picker-item-selected': item8 }]"
            :style="{
              '--item-height': itemHeight + 'px',
              transform: 'translateY(' + index * itemHeight + 'px)',
            }"
          >
            {{ item }}
          </li>
        </template>
      </ul>
    </div>

    <div class="picker-selection-indicator"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

const props = defineProps({
  startValue: {
    type: [Number, String],
    default: 1, // Generic start value
  },
  endValue: {
    type: [Number, String],
    default: 100, // Generic end value
  },
  // The value bound by v-model
  modelValue: {
    type: [Number, String],
    default: 50, // Generic initial value
  },
})

// 2. DEFINE EMITS
const emit = defineEmits(['update:modelValue'])

// --- Configuration & Constants ---
const itemHeight = 40
const friction = 0.96
const fadeDistance = 100

// --- Reactive State ---
const items = ref([])
const currentTranslationY = ref(0)
const isDragging = ref(false)
const lastClientY = ref(0)
const velocity = ref(0)
const animationFrameId = ref(null)
const minTranslationY = ref(0)
const maxTranslationY = ref(0)
const selectedValue = ref('----')

// --- Template Refs ---
const viewportEl = ref(null)
const itemRefs = ref([])

// --- Dynamic Styles ---
const listStyle = ref({})

// --- Data Loading (Generic) ---

const loadData = async () => {
  const startNum = parseInt(props.startValue)
  const endNum = parseInt(props.endValue)

  if (isNaN(startNum) || isNaN(endNum)) {
    console.error('Invalid start or end value prop.')
    return
  }

  // Logic updated to generate a sequential list of numbers (or strings)
  const newItems = []
  if (startNum <= endNum) {
    for (let i = startNum; i <= endNum; i++) {
      newItems.push(String(i))
    }
  } else {
    for (let i = startNum; i >= endNum; i--) {
      newItems.push(String(i))
    }
  }

  items.value = newItems
  itemRefs.value = []
  await nextTick()

  renderWheel()
}

// --- Logic Methods ---

const calculateBoundaries = () => {
  const totalItems = items.value.length
  if (totalItems === 0 || !viewportEl.value) {
    minTranslationY.value = maxTranslationY.value = 0
    return
  }

  const viewportHeight = viewportEl.value.clientHeight
  const centerOffset = viewportHeight / 2 - itemHeight / 2

  maxTranslationY.value = centerOffset
  minTranslationY.value = -((totalItems - 1) * itemHeight) + centerOffset

  if (minTranslationY.value > maxTranslationY.value) {
    minTranslationY.value = maxTranslationY.value
  }
}

const renderWheel = () => {
  const totalItems = items.value.length
  if (totalItems === 0 || !viewportEl.value) return

  calculateBoundaries()

  const viewportHeight = viewportEl.value.clientHeight
  const centerOffset = viewportHeight / 2 - itemHeight / 2

  // Set initial index based on props.modelValue
  const initialValueStr = String(props.modelValue)
  let initialCenterIndex = items.value.indexOf(initialValueStr)

  if (initialCenterIndex === -1) {
    // Fallback to the center if modelValue is not found
    initialCenterIndex = Math.floor(totalItems / 2)
  }

  // Set selected value immediately
  const initialSelection = items.value[initialCenterIndex] || String(props.modelValue)
  selectedValue.value = initialSelection

  // Emit if the initial value passed in props was outside the range
  if (String(props.modelValue) !== initialSelection) {
    emit('update:modelValue', initialSelection)
  }

  currentTranslationY.value = -initialCenterIndex * itemHeight + centerOffset
  currentTranslationY.value = Math.max(
    minTranslationY.value,
    Math.min(maxTranslationY.value, currentTranslationY.value),
  )

  updatePickerPosition(0, true)
}

const updateDisplay = () => {
  const totalItems = items.value.length
  if (totalItems === 0 || !viewportEl.value) return

  const viewportHeight = viewportEl.value.clientHeight
  const centerOffset = viewportHeight / 2 - itemHeight / 2

  const centeredItemPosition = centerOffset - currentTranslationY.value
  let centeredIndex = Math.round(centeredItemPosition / itemHeight)
  centeredIndex = Math.max(0, Math.min(totalItems - 1, centeredIndex))

  const newSelection = items.value[centeredIndex] || 'N/A'

  // Update selectedValue based on current scroll position
  if (selectedValue.value !== newSelection) {
    selectedValue.value = newSelection
  }

  const viewportCenterY = viewportHeight / 2
  const renderedItems = itemRefs.value.filter(Boolean)

  renderedItems.forEach((el, index) => {
    const itemCenterY = index * itemHeight + itemHeight / 2
    const itemScreenY = itemCenterY + currentTranslationY.value
    const distanceToCenter = Math.abs(itemScreenY - viewportCenterY)

    let opacity = 1

    if (distanceToCenter > 0) {
      const normalizedDistance = Math.min(1, distanceToCenter / fadeDistance)
      opacity = 1 - 0.85 * normalizedDistance
    }

    if (index === centeredIndex) {
      //      el.style.opacity = 1
    } else {
      //      el.style.opacity = Math.max(0.2, opacity)
    }
  })
}

const updatePickerPosition = (deltaY, immediate = false) => {
  currentTranslationY.value += deltaY

  const newTranslationY = Math.max(
    minTranslationY.value,
    Math.min(maxTranslationY.value, currentTranslationY.value),
  )

  if (currentTranslationY.value !== newTranslationY) {
    currentTranslationY.value = newTranslationY
    velocity.value = 0
  }

  listStyle.value = {
    transform: `translateY(${currentTranslationY.value}px)`,
    transition: immediate ? 'none' : listStyle.value.transition,
  }

  updateDisplay()

  if (!immediate && !isDragging.value) {
    velocity.value *= friction
    if (Math.abs(velocity.value) > 0.1) {
      animationFrameId.value = requestAnimationFrame(() => updatePickerPosition(velocity.value))
    } else {
      snapToNearestItem()
    }
  }
}

const snapToNearestItem = () => {
  if (!viewportEl.value) return

  const viewportHeight = viewportEl.value.clientHeight
  const centerOffset = viewportHeight / 2 - itemHeight / 2
  const centeredItemPosition = centerOffset - currentTranslationY.value
  const targetIndex = Math.round(centeredItemPosition / itemHeight)

  let targetTranslationY = -targetIndex * itemHeight + centerOffset

  targetTranslationY = Math.max(
    minTranslationY.value,
    Math.min(maxTranslationY.value, targetTranslationY),
  )

  if (Math.abs(currentTranslationY.value - targetTranslationY) < 0.1) {
    // Emit update:modelValue if we stopped moving but the value changed previously
    if (String(props.modelValue) !== selectedValue.value) {
      emit('update:modelValue', selectedValue.value)
    }
    return
  }

  listStyle.value = {
    transform: `translateY(${targetTranslationY}px)`,
    transition: 'transform 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  }

  currentTranslationY.value = targetTranslationY

  setTimeout(() => {
    listStyle.value = {
      transform: `translateY(${currentTranslationY.value}px)`,
      transition: 'none',
    }
    updateDisplay()

    // Emit update:modelValue after the snap is visually complete
    emit('update:modelValue', selectedValue.value)
  }, 200)
}

const handleStart = (event) => {
  if (items.value.length === 0) return

  const clientY = event.touches ? event.touches[0].clientY : event.clientY

  isDragging.value = true
  lastClientY.value = clientY
  velocity.value = 0
  if (animationFrameId.value) cancelAnimationFrame(animationFrameId.value)

  listStyle.value = { transform: `translateY(${currentTranslationY.value}px)`, transition: 'none' }
}

const handleMove = (event) => {
  if (!isDragging.value) return
  if (event.cancelable) event.preventDefault()

  const clientY = event.touches ? event.touches[0].clientY : event.clientY
  const deltaY = clientY - lastClientY.value

  updatePickerPosition(deltaY, true)

  velocity.value = deltaY
  lastClientY.value = clientY
}

const handleEnd = () => {
  if (!isDragging.value) return
  isDragging.value = false

  if (Math.abs(velocity.value) > 1) {
    animationFrameId.value = requestAnimationFrame(() => updatePickerPosition(velocity.value))
  } else {
    snapToNearestItem()
  }
}

const setItemRef = (el) => {
  if (el) itemRefs.value.push(el)
}

// --- Lifecycle Hooks ---
onMounted(() => {
  loadData()

  document.addEventListener('mousemove', handleMove)
  document.addEventListener('mouseup', handleEnd)

  window.addEventListener('resize', calculateBoundaries)
})
</script>

<style lang="scss" scoped>
@use '@/styles/components/LinearPicker' as *;
</style>
