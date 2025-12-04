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
          <button :class="['control-btn']" id="downloadBtn" @click="download" title="Download">
            <i class="fa-solid fa-download" />
          </button>

          <button
            :class="['control-btn', { active: currentIsFitMode }]"
            id="fitBtn"
            @click="setFitMode"
            title="Fit to screen"
          >
            <i class="fa-solid fa-expand" />
          </button>
          <button
            :class="['control-btn', { active: !currentIsFitMode }]"
            id="scrollBtn"
            @click="setScrollMode"
            title="Full size (scrollable)"
          >
            <i class="fa-solid fa-maximize" />
          </button>
          <button class="control-btn close-btn" @click="closeViewer" title="Close">
            <i class="fa-solid fa-close" />
          </button>
        </div>
      </div>

      <div class="viewer-content">
        <div :class="['image-container', containerModeClass]" ref="imageContainerRef">
          <img class="viewer-image" :src="src" :alt="title" @dragstart.prevent />
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
})

const download = () => {
  try {
    let imageURL = props.src
    let imageDescription = props.alt
    let downloadedImg = new Image()

    const imageReceived = () => {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')

      canvas.width = downloadedImg.width
      canvas.height = downloadedImg.height
      canvas.innerText = downloadedImg.alt

      context.drawImage(downloadedImg, 0, 0)

      try {
        var link = document.createElement('a')
        link.download = 'filename.png'
        link.href = canvas.toDataURL('image/png')
        link.click()
      } catch (err) {
        alert(`Error: ${err}`)
      }
    }

    //   downloadedImg.crossOrigin = 'anonymous'
    downloadedImg.addEventListener('load', imageReceived)
    downloadedImg.alt = imageDescription
    downloadedImg.src = imageURL
  } catch (err) {
    alert(`Error: ${err}`)
  }
}

// --- Define Emits (for v-model updates and events) ---
const emit = defineEmits(['update:modelValue', 'mode-change'])

// --- Internal State (for mode control) ---
const currentIsFitMode = ref(props.initialFitMode)
const imageContainerRef = ref(null)

// --- Computed Properties ---
const containerModeClass = computed(() => (currentIsFitMode.value ? 'fit-mode' : 'scroll-mode'))

const modeIndicatorText = computed(() => (currentIsFitMode.value ? 'Fit to Screen' : 'Full Size'))

// --- Watcher for Visibility Prop ---
watch(
  () => modelValue,
  (newVisible) => {
    if (newVisible.value) {
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
  emit('update:modelValue', false)
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
  if (!modelValue) return

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
      border-radius: 8px;
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
      border-radius: 8px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
      transition: all 0.3s ease;
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
