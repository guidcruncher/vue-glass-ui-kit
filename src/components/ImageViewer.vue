<template>
  <div class="image-viewer-wrapper">
    <div
      :class="['image-viewer-overlay', { active: visible }]"
      id="imageViewer"
      @click="handleOverlayClick"
    >
      <div class="viewer-header">
        <div class="viewer-title">{{ title }}</div>
        <div class="viewer-controls">
          <button
            :class="['control-btn', { active: currentIsFitMode }]"
            id="fitBtn"
            @click="setFitMode"
            title="Fit to screen"
          >
            <span>⊡</span>
          </button>
          <button
            :class="['control-btn', { active: !currentIsFitMode }]"
            id="scrollBtn"
            @click="setScrollMode"
            title="Full size (scrollable)"
          >
            <span>⊞</span>
          </button>
          <button class="control-btn close-btn" @click="closeViewer" title="Close">
            <span>×</span>
          </button>
        </div>
      </div>

      <div class="viewer-content">
        <div :class="['image-container', containerModeClass]" ref="imageContainerRef">
          <img class="viewer-image" :src="url" :alt="title" @dragstart.prevent />
        </div>
      </div>

      <div class="viewer-footer">
        <div class="image-info">{{ info }}</div>
        <div class="mode-indicator">{{ modeIndicatorText }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

// --- Define Props ---
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: 'Image Viewer',
  },
  url: {
    type: String,
    required: true,
    default: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600',
  },
  info: {
    type: String,
    default: 'Image details not provided.',
  },
  initialFitMode: {
    type: Boolean,
    default: true,
  },
})

// --- Define Emits (for v-model updates and events) ---
const emit = defineEmits(['update:visible', 'mode-change'])

// --- Internal State (for mode control) ---
const currentIsFitMode = ref(props.initialFitMode)
const imageContainerRef = ref(null)

// --- Computed Properties ---
const containerModeClass = computed(() => (currentIsFitMode.value ? 'fit-mode' : 'scroll-mode'))

const modeIndicatorText = computed(() => (currentIsFitMode.value ? 'Fit to Screen' : 'Full Size'))

// --- Watcher for Visibility Prop ---
watch(
  () => props.visible,
  (newVisible) => {
    if (newVisible) {
      document.body.style.overflow = 'hidden'
      currentIsFitMode.value = props.initialFitMode
      if (currentIsFitMode.value) {
        setFitModeScrollReset()
      }
    } else {
      document.body.style.overflow = ''
    }
  },
  { immediate: true },
)

// --- Methods ---
const closeViewer = () => {
  emit('update:visible', false)
}

const setFitModeScrollReset = () => {
  if (imageContainerRef.value) {
    imageContainerRef.value.scrollTop = 0
    imageContainerRef.value.scrollLeft = 0
  }
}

const setFitMode = () => {
  currentIsFitMode.value = true
  setFitModeScrollReset()
  emit('mode-change', 'fit')
}

const setScrollMode = () => {
  currentIsFitMode.value = false
  emit('mode-change', 'scroll')
}

const handleOverlayClick = (event) => {
  if (event.target === event.currentTarget) {
    closeViewer()
  }
}

// --- Keyboard Event Handling ---
const handleKeydown = (e) => {
  if (!props.visible) return

  if (e.key === 'Escape') {
    closeViewer()
  } else if (e.key === 'f' || e.key === 'F') {
    setFitMode()
  } else if (e.key === 's' || e.key === 'S') {
    setScrollMode()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style lang="scss" scoped>
  @use "@/styles/components/ImageViewer" as *;
</style>
