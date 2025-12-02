<template>
  <div class="ui-date-picker">
    <div class="picker-container">
      <div class="highlight"></div>

      <div class="wheel" ref="monthWheel">
        <div class="padding"></div>
        <div v-for="month in months" :key="month" class="item">{{ month }}</div>
        <div class="padding"></div>
      </div>

      <div class="wheel" ref="dayWheel">
        <div class="padding"></div>
        <div v-for="day in days" :key="day" class="item">{{ day }}</div>
        <div class="padding"></div>
      </div>

      <div class="wheel" ref="yearWheel">
        <div class="padding"></div>
        <div v-for="year in years" :key="year" class="item">{{ year }}</div>
        <div class="padding"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
const days = Array.from({ length: 31 }, (_, i) => i + 1)
const years = Array.from({ length: 10 }, (_, i) => 2025 + i)

// Actual snapping and selection logic (omitted for complexity) would involve
// 'scroll' event listeners, debounce, and using Element.scrollTop to center an item.

const monthWheel = ref<HTMLElement | null>(null)
const dayWheel = ref<HTMLElement | null>(null)
const yearWheel = ref<HTMLElement | null>(null)
</script>

<style lang="scss" scoped>
.ui-date-picker {
  display: inline-block;

  .picker-container {
    display: flex;
    height: 160px;
    background: var(--ios-background);
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    width: 300px;
    margin: 0 auto;
  }

  .highlight {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 34px;
    // Highlight Bar (Glass)
    background: rgba(120, 120, 128, 0.1);
    transform: translateY(-50%);
    pointer-events: none;
    z-index: 10;
    border-top: 0.5px solid rgba(0, 0, 0, 0.05);
    border-bottom: 0.5px solid rgba(0, 0, 0, 0.05);
  }

  .wheel {
    flex: 1;
    overflow-y: scroll;
    scroll-snap-type: y mandatory; // Enables native scroll snapping
    height: 100%;
    scrollbar-width: none; /* Firefox */

    &::-webkit-scrollbar {
      display: none; // Chrome, Safari, Opera
    }
  }

  .item {
    height: 34px;
    line-height: 34px;
    text-align: center;
    font-size: 19px;
    scroll-snap-align: center;
    color: var(--ios-text-primary);
    user-select: none;
  }

  .padding {
    height: 63px; /* Centers the item (160/2 - 34/2) */
  }
}
</style>
