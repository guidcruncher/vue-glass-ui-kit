<template>
  <div :class="['split-view-container', 'material-thin', { 'mobile-layout': isMobile }]">
    <div
      :class="[
        'split-view-primary',
        'glass-panel', // Base class for glass styles
        'material-ultraThin', // Applying the desired material variant
        { 'is-hidden': isMobile && !showPrimary },
      ]"
      :style="primaryPanelStyle"
    >
      <slot name="primary"></slot>

      <div v-if="isMobile" class="split-view-toggle">
        <button @click="showSecondaryPanel" v-if="showPrimary">&lt; Back to Detail</button>
      </div>
    </div>

    <div
      :class="[
        'split-view-secondary',
        'glass-panel', // Base class for glass styles
        'material-ultraThin',
        { 'is-hidden': isMobile && showPrimary },
      ]"
    >
      <div v-if="isMobile" class="split-view-mobile-header">
        <button @click="showPrimaryPanel" v-if="!showPrimary">☰ Menu</button>
      </div>
      <slot name="secondary"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const MOBILE_BREAKPOINT = 768

const PRIMARY_PANEL_WIDTH = '300px'

const isMobile = ref(false)
const showPrimary = ref(true)

const primaryPanelStyle = computed(() => {
  if (!isMobile.value) {
    return { width: PRIMARY_PANEL_WIDTH }
  }

  return {}
})

const showPrimaryPanel = () => {
  showPrimary.value = true
}

const showSecondaryPanel = () => {
  if (isMobile.value) {
    showPrimary.value = false
  }
}

const checkBreakpoint = () => {
  isMobile.value = window.innerWidth < MOBILE_BREAKPOINT

  if (!isMobile.value) {
    showPrimary.value = true
  }
}

onMounted(() => {
  checkBreakpoint()
  window.addEventListener('resize', checkBreakpoint)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkBreakpoint)
})

defineExpose({
  showPrimaryPanel,
  showSecondaryPanel,
})
</script>

<style lang="scss" scoped>
@use '@/styles/components/GlassSplitContainer' as *;
</style>
