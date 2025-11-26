<template>
  <div class="flip-card">
    <svg width="80" height="60" viewBox="0 0 80 60" class="card top-card">
      <defs>
        <linearGradient :id="`topGrad-${value}-${animKey}`" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#2a2a2a" />
          <stop offset="100%" stop-color="#1f1f1f" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="76" height="56" rx="4" :fill="`url(#topGrad-${value}-${animKey})`" />
      <rect
        x="2"
        y="2"
        width="76"
        height="56"
        rx="4"
        fill="none"
        stroke="#3a3a3a"
        stroke-width="1"
      />
      <text
        x="40"
        y="60"
        text-anchor="middle"
        dominant-baseline="middle"
        fill="#ffffff"
        font-size="72"
        font-family="Arial, sans-serif"
        font-weight="bold"
      >
        {{ value }}
      </text>
    </svg>

    <svg width="80" height="60" viewBox="0 0 80 60" class="card bottom-card">
      <defs>
        <linearGradient :id="`bottomGrad-${value}-${animKey}`" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#1f1f1f" />
          <stop offset="100%" stop-color="#151515" />
        </linearGradient>
      </defs>
      <rect
        x="2"
        y="2"
        width="76"
        height="56"
        rx="4"
        :fill="`url(#bottomGrad-${value}-${animKey})`"
      />
      <rect
        x="2"
        y="2"
        width="76"
        height="56"
        rx="4"
        fill="none"
        stroke="#3a3a3a"
        stroke-width="1"
      />
      <text
        x="40"
        y="0"
        text-anchor="middle"
        dominant-baseline="middle"
        fill="#ffffff"
        font-size="72"
        font-family="Arial, sans-serif"
        font-weight="bold"
      >
        {{ value }}
      </text>
    </svg>

    <div class="center-line"></div>

    <svg
      v-if="isFlipping"
      :key="`top-flip-${animKey}`"
      width="80"
      height="60"
      viewBox="0 0 80 60"
      class="flipping top-flip"
    >
      <rect x="2" y="2" width="76" height="56" rx="4" fill="#2a2a2a" />
      <rect
        x="2"
        y="2"
        width="76"
        height="56"
        rx="4"
        fill="none"
        stroke="#3a3a3a"
        stroke-width="1"
      />
      <text
        x="40"
        y="60"
        text-anchor="middle"
        dominant-baseline="middle"
        fill="#ffffff"
        font-size="72"
        font-family="Arial, sans-serif"
        font-weight="bold"
      >
        {{ prevValue }}
      </text>
    </svg>

    <svg
      v-if="isFlipping"
      :key="`bottom-flip-${animKey}`"
      width="80"
      height="60"
      viewBox="0 0 80 60"
      class="flipping bottom-flip"
    >
      <rect x="2" y="2" width="76" height="56" rx="4" fill="#1f1f1f" />
      <rect
        x="2"
        y="2"
        width="76"
        height="56"
        rx="4"
        fill="none"
        stroke="#3a3a3a"
        stroke-width="1"
      />
      <text
        x="40"
        y="0"
        text-anchor="middle"
        dominant-baseline="middle"
        fill="#ffffff"
        font-size="72"
        font-family="Arial, sans-serif"
        font-weight="bold"
      >
        {{ value }}
      </text>
    </svg>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  value: { type: String, required: true },
  prevValue: { type: String, required: true },
})

const isFlipping = computed(() => props.value !== props.prevValue)

const animKey = ref(0)

watch(isFlipping, (newVal) => {
  if (newVal) animKey.value++
})
</script>

<style lang="scss" scoped>
@use '@/styles/components/FlipCard' as *;
</style>
