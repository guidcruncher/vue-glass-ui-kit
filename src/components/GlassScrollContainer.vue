<template>
  <div class="apple-scroll-view-container" ref="containerRef" @scroll="handleScroll">
    <div class="scroll-shadow top" :class="{ visible: showTopShadow }"></div>

    <div class="apple-scroll-view-content">
      <slot></slot>
    </div>

    <div class="scroll-shadow bottom" :class="{ visible: showBottomShadow }"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const containerRef = ref(null)
const showTopShadow = ref(false)
const showBottomShadow = ref(false)

const updateShadows = () => {
  const container = containerRef.value

  if (!container) return

  const isScrollable = container.scrollHeight > container.clientHeight

  if (!isScrollable) {
    showTopShadow.value = false
    showBottomShadow.value = false
    return
  }

  showTopShadow.value = container.scrollTop > 0

  const isAtBottom =
    Math.ceil(container.scrollTop + container.clientHeight) >= container.scrollHeight
  showBottomShadow.value = !isAtBottom
}

const handleScroll = () => {
  updateShadows()
}

onMounted(() => {
  nextTick(() => {
    updateShadows()
  })

  window.addEventListener('resize', updateShadows)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateShadows)
})
</script>

<style lang="scss" scoped>
@use '@/styles/components/GlassScrollContainer' as *;
</style>
