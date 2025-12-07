<template>
  <div class="image-viewer-wrapper">
    <div
      :class="['image-viewer-overlay', { active: modelValue }]"
      id="imageViewer"
      @click="handleOverlayClick"
    >
      <div class="viewer-header">
        <div class="viewer-title">{{ title }}</div>
        <div class="viewer-controls">
          <template v-if="manipulationEnabled">
            <button class="control-btn" @click="resetManipulation" title="Reset All (Esc)">
              <i class="fa-solid fa-redo" />
            </button>

            <button :class="['control-btn']" @click="zoomOut" title="Zoom Out (-)">
              <i class="fa-solid fa-magnifying-glass-minus" />
            </button>
            <button :class="['control-btn']" @click="zoomIn" title="Zoom In (=)">
              <i class="fa-solid fa-magnifying-glass-plus" />
            </button>
            <button :class="['control-btn']" @click="rotateClockwise" title="Rotate (R)">
              <i class="fa-solid fa-rotate-right" />
            </button>

            <button
              :class="['control-btn', { active: isFlippedH }]"
              @click="toggleFlipHorizontal"
              title="Flip Horizontal (H)"
            >
              <i class="fa-solid fa-arrows-left-right" />
            </button>
            <button
              :class="['control-btn', { active: isFlippedV }]"
              @click="toggleFlipVertical"
              title="Flip Vertical (V)"
            >
              <i class="fa-solid fa-arrows-up-down" />
            </button>

            <button
              :class="['control-btn', { active: isGrayscale }]"
              @click="toggleGrayscale"
              title="Grayscale (G)"
            >
              <i class="fa-solid fa-palette" />
            </button>
            <button
              :class="['control-btn', { active: isInverted }]"
              @click="toggleInvert"
              title="Invert Colors (I)"
            >
              <i class="fa-solid fa-wand-magic-sparkles" />
            </button>
            <button
              :class="['control-btn', { active: isSepia }]"
              @click="toggleSepia"
              title="Sepia Tone (P)"
            >
              <i class="fa-solid fa-image" />
            </button>
          </template>

          <button
            :class="['control-btn', { active: currentIsFitMode }]"
            id="fitBtn"
            @click="setFitMode"
            title="Fit to screen (F)"
          >
            <i class="fa-solid fa-expand" />
          </button>
          <button
            :class="['control-btn', { active: !currentIsFitMode }]"
            id="scrollBtn"
            @click="setScrollMode"
            title="Full size (scrollable) (S)"
          >
            <i class="fa-solid fa-maximize" />
          </button>

          <button class="control-btn close-btn" @click="closeViewer" title="Close (Esc)">
            <i class="fa-solid fa-close" />
          </button>
        </div>
      </div>

      <div
        class="viewer-content"
        @mousedown="handlePanStart"
        @mousemove="handlePanMove"
        @mouseup="handlePanEnd"
        @mouseleave="handlePanEnd"
      >
        <div :class="['image-container', containerModeClass]" ref="imageContainerRef">
          <img
            class="viewer-image"
            :src="src"
            :alt="title"
            @dragstart.prevent
            :style="[imageTransformStyle, imageFilterStyle]"
          />
        </div>
      </div>

      <div class="viewer-footer">
        <div class="image-info">{{ alt }}</div>
        <div class="mode-indicator">{{ modeIndicatorText }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

const modelValue = defineModel({ default: false })
// --- Define Props ---
const props = defineProps({
  title: {
    type: String,
    default: 'Image Viewer',
  },
  src: {
    type: String,
    required: true,
    default: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600',
  },
  alt: {
    type: String,
    default: 'Image details not provided.',
  },
  initialFitMode: {
    type: Boolean,
    default: true,
  },
  // Prop to enable/disable image manipulation features
  manipulationEnabled: {
    type: Boolean,
    default: true,
  },
})

// --- Constants ---
const ZOOM_STEP = 0.1
const MIN_SCALE = 0.1
const ROTATION_STEP = 90

// --- Internal State for Manipulation ---
const scale = ref(1.0)
const rotation = ref(0) // in degrees
const isFlippedH = ref(false)
const isFlippedV = ref(false)
const isGrayscale = ref(false)
const isInverted = ref(false)
const isSepia = ref(false)

// --- State for Pan/Drag ---
const isPanning = ref(false)
const panStartX = ref(0)
const panStartY = ref(0)

// --- Computed Style for Image Transform ---
const imageTransformStyle = computed(() => {
  const scaleX = isFlippedH.value ? -1 * scale.value : scale.value
  const scaleY = isFlippedV.value ? -1 * scale.value : scale.value
  return {
    transform: `scale(${scaleX}, ${scaleY}) rotate(${rotation.value}deg)`,
  }
})

// --- Computed Style for Image Filters ---
const imageFilterStyle = computed(() => {
  let filters = []
  if (isGrayscale.value) filters.push('grayscale(100%)')
  if (isInverted.value) filters.push('invert(100%)')
  if (isSepia.value) filters.push('sepia(100%)')

  return {
    filter: filters.join(' '),
  }
})

// --- Methods for Manipulation ---
const resetManipulation = () => {
  scale.value = 1.0
  rotation.value = 0
  isFlippedH.value = false
  isFlippedV.value = false
  isGrayscale.value = false
  isInverted.value = false
  isSepia.value = false
}

const zoomIn = () => {
  if (currentIsFitMode.value) setScrollMode()
  scale.value += ZOOM_STEP
}

const zoomOut = () => {
  if (currentIsFitMode.value) setScrollMode()
  scale.value = Math.max(MIN_SCALE, scale.value - ZOOM_STEP)
}

const rotateClockwise = () => {
  rotation.value = (rotation.value + ROTATION_STEP) % 360
}

const toggleFlipHorizontal = () => {
  isFlippedH.value = !isFlippedH.value
  if (currentIsFitMode.value) setScrollMode()
}

const toggleFlipVertical = () => {
  isFlippedV.value = !isFlippedV.value
  if (currentIsFitMode.value) setScrollMode()
}

const toggleGrayscale = () => {
  isGrayscale.value = !isGrayscale.value
}
const toggleInvert = () => {
  isInverted.value = !isInverted.value
}
const toggleSepia = () => {
  isSepia.value = !isSepia.value
}

// --- Pan/Drag Methods ---
const handlePanStart = (event) => {
  if (!props.manipulationEnabled || currentIsFitMode.value || event.button !== 0) return
  const container = imageContainerRef.value
  if (!container) return

  if (container.scrollWidth <= container.clientWidth && container.scrollHeight <= container.clientHeight) return

  isPanning.value = true
  panStartX.value = event.pageX + container.scrollLeft
  panStartY.value = event.pageY + container.scrollTop
  container.style.cursor = 'grabbing'
}

const handlePanMove = (event) => {
  if (!isPanning.value || !props.manipulationEnabled) return
  const container = imageContainerRef.value
  if (!container) return

  const dx = panStartX.value - event.pageX
  const dy = panStartY.value - event.pageY

  container.scrollLeft = dx
  container.scrollTop = dy
}

const handlePanEnd = () => {
  if (!isPanning.value) return
  isPanning.value = false
  if (imageContainerRef.value) {
    imageContainerRef.value.style.cursor = 'grab'
  }
}

// --- Define Emits, Internal State (for mode control) ---
const emit = defineEmits(['update:modelValue', 'mode-change'])
const currentIsFitMode = ref(props.initialFitMode)
const imageContainerRef = ref(null)

const containerModeClass = computed(() => (currentIsFitMode.value ? 'fit-mode' : 'scroll-mode'))
const modeIndicatorText = computed(() => (currentIsFitMode.value ? 'Fit to Screen' : 'Full Size'))

// --- Mode Methods ---
const closeViewer = () => {
  modelValue.value = false
}

const setFitModeScrollReset = () => {
  if (imageContainerRef.value) {
    imageContainerRef.value.scrollTop = 0
    imageContainerRef.value.scrollLeft = 0
  }
}

const setFitMode = () => {
  currentIsFitMode.value = true
  resetManipulation()
  setFitModeScrollReset()
  emit('mode-change', 'fit')
}

const setScrollMode = () => {
  currentIsFitMode.value = false
  emit('mode-change', 'scroll')
}

// --- Watcher for Visibility Prop ---
watch(
  () => modelValue.value,
  (newVisible) => {
    if (newVisible) {
      document.body.style.overflow = 'hidden'
      resetManipulation()
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

const handleOverlayClick = (event) => {
  if (event.target === event.currentTarget) {
    closeViewer()
  }
}

// --- Keyboard Event Handling ---
const handleKeydown = (e) => {
  if (!modelValue.value) return

  if (e.key === 'Escape') {
    closeViewer()
  } else if (e.key === 'f' || e.key === 'F') {
    setFitMode()
  } else if (e.key === 's' || e.key === 'S') {
    setScrollMode()
  } else if (props.manipulationEnabled) {
    if (e.key === '=') {
      zoomIn()
    } else if (e.key === '-') {
      zoomOut()
    } else if (e.key === 'r' || e.key === 'R') {
      rotateClockwise()
    } else if (e.key === 'h' || e.key === 'H') {
      toggleFlipHorizontal()
    } else if (e.key === 'v' || e.key === 'V') {
      toggleFlipVertical()
    } else if (e.key === 'g' || e.key === 'G') {
      toggleGrayscale()
    } else if (e.key === 'i' || e.key === 'I') {
      toggleInvert()
    } else if (e.key === 'p' || e.key === 'P') {
      toggleSepia()
    }
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
.image-viewer-wrapper {
  .image-viewer-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0);
    display: flex;
    flex-direction: column;
    z-index: 8000;
    opacity: 0;
    visibility: hidden;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

    &.active {
      background: rgba(0, 0, 0, 0.85);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      opacity: 1;
      visibility: visible;
    }

    .viewer-header {
      background: rgba(255, 255, 255, 0.08);
      backdrop-filter: blur(40px) saturate(180%);
      -webkit-backdrop-filter: blur(40px) saturate(180%);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding: 16px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transform: translateY(-100%);
      transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &.active .viewer-header {
      transform: translateY(0);
    }

    .viewer-title {
      color: white;
      font-size: 16px;
      font-weight: 500;
      flex: 1;
    }

    .viewer-controls {
      display: flex;
      gap: 12px;
      align-items: center;
    }

    .control-btn {
      width: 36px;
      height: 36px;
      background: rgba(255, 255, 255, 0.12);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: var(--radius-small);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      color: white;
      font-size: 18px;

      &:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: scale(1.05);
      }

      &:active {
        transform: scale(0.95);
      }

      &.active {
        background: rgba(255, 255, 255, 0.25);
        border-color: rgba(255, 255, 255, 0.3);
      }

      &.close-btn {
        background: rgba(255, 59, 48, 0.8);
        border-color: rgba(255, 59, 48, 0.5);

        &:hover {
          background: rgba(255, 59, 48, 1);
        }
      }
    }

    .viewer-content {
      flex: 1;
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: grab;
    }

    .image-container {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px;
      transform: scale(0.9);
      opacity: 0;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

      &.fit-mode {
        overflow: hidden;
      }

      &.scroll-mode {
        overflow: auto;
        align-items: flex-start;
        justify-content: flex-start;

        &::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        &::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }

        &::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;

          &:hover {
            background: rgba(255, 255, 255, 0.3);
          }
        }
      }
    }

    &.active .image-container {
      transform: scale(1);
      opacity: 1;
    }

    .viewer-image {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      border-radius: var(--radius-small);
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
      transition: all 0.3s ease, transform 0.3s ease-out, filter 0.3s ease;
      transform-origin: center center;
    }

    .image-container.scroll-mode .viewer-image {
      max-width: none;
      max-height: none;
      width: auto;
      height: auto;
    }

    .viewer-footer {
      background: rgba(255, 255, 255, 0.08);
      backdrop-filter: blur(40px) saturate(180%);
      -webkit-backdrop-filter: blur(40px) saturate(180%);
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding: 16px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: white;
      transform: translateY(100%);
      transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &.active .viewer-footer {
      transform: translateY(0);
    }

    .image-info {
      font-size: 14px;
      opacity: 0.8;
    }

    .mode-indicator {
      background: rgba(255, 255, 255, 0.12);
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 500;
      border: 1px solid rgba(255, 255, 255, 0.15);
    }

    @media (max-width: 768px) {
      .viewer-header,
      .viewer-footer {
        padding: 12px 16px;
      }

      .viewer-title {
        font-size: 14px;
      }

      .image-container {
        padding: 20px;
      }

      .control-btn {
        width: 32px;
        height: 32px;
        font-size: 16px;
      }
    }
  }
}
</style>
