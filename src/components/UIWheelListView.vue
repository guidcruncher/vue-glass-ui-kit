<template>
  <div
    class="wheel"
    ref="wheelRef"
    @scroll="!disabled && debouncedHandleScroll($event)"
  >
    <!-- Top padding to allow the first item to center -->
    <div class="padding" :style="{ height: paddingHeight }"></div>

    <!-- Render the actual items -->
    <div
      v-for="(item, index) in items"
      :key="index"
      class="item"
      :style="{ height: itemHeight + 'px', lineHeight: itemHeight + 'px' }"
    >
      <slot :item="item" :index="index">{{ item }}</slot>
    </div>

    <!-- Bottom padding to allow the last item to center -->
    <div class="padding" :style="{ height: paddingHeight }"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, nextTick, computed } from 'vue'

// --- Simple Local Debounce Utility ---
// Included locally as the previous path was relative
const debounce = (fn: Function, delay: number) => {
  let timeoutId: number;
  return function(this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay) as any;
  };
};

interface Props {
  /** The array of items to display (e.g., months, hours, list items) */
  items: any[]
  /** The 0-based index of the item that should be selected */
  selectedIndex: number
  /** Height of a single item in pixels */
  itemHeight?: number
  /** Total height of the visible container in pixels */
  containerHeight?: number
  /** If the wheel should be disabled */
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  itemHeight: 34,
  containerHeight: 160,
  disabled: false,
})

const emit = defineEmits<{
  (e: 'update:selectedIndex', index: number): void
}>()

const wheelRef = ref<HTMLElement | null>(null)

// Calculated height for the top/bottom padding elements
const paddingHeight = computed(() => {
  return `${(props.containerHeight - props.itemHeight) / 2}px`
})


/**
 * Sets the wheel's scrollTop to center the item corresponding to the initial index.
 */
const calculateInitialScroll = () => {
  if (!wheelRef.value) return

  // Centering the Nth item (0-based) requires a scrollTop of N * ITEM_HEIGHT.
  // The scroll position is based on the top edge of the item being scrolled to.
  wheelRef.value.scrollTop = props.selectedIndex * props.itemHeight
}

/**
 * Handles scroll events: snaps the scroll position and emits the new selected index.
 */
const handleScroll = (event: Event) => {
  const target = event.target as HTMLElement
  
  const currentScrollTop = target.scrollTop
  
  // 1. Calculate the 0-based data index (N) by rounding to the nearest snap point.
  // This is the core fix for the off-by-one error.
  const itemIndex = Math.round(currentScrollTop / props.itemHeight)
  
  // 2. Snap the scroll position precisely to the calculated center
  target.scrollTop = itemIndex * props.itemHeight

  // 3. Emit the index, clamped within the bounds of the actual data array
  const clampedIndex = Math.min(Math.max(0, itemIndex), props.items.length - 1)
  
  if (clampedIndex !== props.selectedIndex) {
    emit('update:selectedIndex', clampedIndex)
  }
}

const debouncedHandleScroll = debounce(handleScroll, 150)

// Watch the selectedIndex prop to update scroll position externally
watch(() => props.selectedIndex, () => {
  nextTick(calculateInitialScroll)
}, { immediate: true })

onMounted(() => {
  calculateInitialScroll()
})
</script>

<style lang="scss" scoped>
.wheel {
  flex: 1;
  overflow-y: scroll;
  // Scroll snap ensures the center of the item aligns with the center of the wheel
  scroll-snap-type: y mandatory;
  height: 100%;
  scrollbar-width: none;
  padding: 0 4px;
  
  &::-webkit-scrollbar {
    display: none;
  }
}

.item {
  text-align: center;
  font-size: 17px;
  color: var(--ios-text-primary);
  scroll-snap-align: center;
  user-select: none;
}

.padding {
  pointer-events: none;
}
</style>
