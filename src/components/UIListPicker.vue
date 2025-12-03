<template>
  <div class="ui-list-picker">
    <div class="picker-container">
      <div class="highlight"></div>

      <div class="wheel" ref="pickerWheel" @scroll="debouncedHandleScroll($event)">
        <div class="padding"></div>
        <div
          v-for="item in items"
          :key="item.key"
          class="item"
          :class="{ selected: item.key === modelValue }"
        >
          {{ item.value }}
        </div>
        <div class="padding"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import { debounce } from '@/utils/debounce' // ASSUME PATH: '@/utils/debounce'

// --- Types ---
interface ListItem {
  key: string | number
  value: string
}

// --- Props and Emits for v-model ---
interface Props {
  /** The key of the currently selected item, bound via v-model */
  modelValue: string | number | null
  /** The list of selectable items (key/value pairs) */
  items: ListItem[]
}
const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', key: string | number): void
}>()

// --- Constants and Refs ---
const ITEM_HEIGHT = 34 // Must match SCSS
const pickerWheel = ref<HTMLElement | null>(null)

// --- Scroll Utility ---
/** Calculates the index of the item closest to the center line based on scrollTop. */
const getCenteredIndex = (scrollTop: number): number => {
  return Math.round(scrollTop / ITEM_HEIGHT)
}

/** Calculates the required scrollTop value for a given item index. */
const calculateScrollTop = (itemIndex: number) => {
  return itemIndex * ITEM_HEIGHT
}

// --- Initialization Logic ---
const setInitialScroll = () => {
  const initialKey = props.modelValue

  if (pickerWheel.value && initialKey !== null) {
    // 1. Find the index of the item matching the modelValue key
    const initialIndex = props.items.findIndex((item) => item.key === initialKey)

    // 2. If found, scroll to that position
    if (initialIndex !== -1) {
      // FIX: Use nextTick to ensure the DOM has completed layout calculations
      nextTick(() => {
        pickerWheel.value!.scrollTop = calculateScrollTop(initialIndex)
      })
    }
  }
}

onMounted(() => {
  // Use a slight delay for maximum reliability, especially inside transitions
  setTimeout(setInitialScroll, 50)
})

// Watch external changes to modelValue and update scroll position
watch(
  () => props.modelValue,
  () => {
    setTimeout(setInitialScroll, 50)
  },
  { deep: true },
)

// --- Scroll/Selection Logic ---
const handleScroll = (event: Event) => {
  const target = event.target as HTMLElement

  // 1. Calculate the centered index
  const centeredIndex = getCenteredIndex(target.scrollTop)

  // Ensure the index is within bounds of the items array
  const finalIndex = centeredIndex % props.items.length

  if (finalIndex >= 0 && finalIndex < props.items.length) {
    // 2. Look up the key of the selected item
    const selectedItem = props.items[finalIndex]

    // 3. Emit the selected key
    emit('update:modelValue', selectedItem.key)
  }
}

// Debounce the scroll handling to prevent excessive updates while scrolling
const debouncedHandleScroll = debounce(handleScroll, 150)
</script>

<style lang="scss" scoped>
@use 'sass:math';

.ui-list-picker {
  display: inline-block;

  .picker-container {
    display: flex;
    height: 160px; /* Standard picker height */
    background: var(--ios-background);
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    width: 200px; /* Default width for a single wheel */
    margin: 0 auto;
  }

  .highlight {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 34px; /* Standard item height */
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
    scroll-snap-type: y mandatory;
    height: 100%;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
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

    // Optional: Highlight text in the center (depends on external JS/CSS,
    // but the `highlight` bar usually suffices)
    /* &.selected {
        color: var(--system-blue); 
        font-weight: 600;
    }
    */
  }

  .padding {
    // Height needed to center one item: (Total Height - Item Height) / 2
    height: math.div((160px - 34px), 2); /* 63px */
  }
}
</style>
