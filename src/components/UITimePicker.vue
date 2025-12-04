<template>
  <div class="ui-date-picker">
    <div class="picker-container">
      <div class="highlight"></div>

      <!-- Hour Wheel -->
      <div class="wheel" ref="hourWheel" @scroll="debouncedHandleScroll('hour', $event)">
        <div class="padding"></div>
        <div v-for="(hour, index) in hours" :key="index" class="item">
          {{ String(hour).padStart(2, '0') }}
        </div>
        <div class="padding"></div>
      </div>

      <!-- Minute Wheel -->
      <div class="wheel" ref="minuteWheel" @scroll="debouncedHandleScroll('minute', $event)">
        <div class="padding"></div>
        <div v-for="(minute, index) in minutes" :key="index" class="item">
          {{ String(minute).padStart(2, '0') }}
        </div>
        <div class="padding"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import { debounce } from '@/utils/debounce'

interface Props {
  modelValue: Date | null
}
const props = defineProps<Props>()

// FIX: Correctly define emit
const emit = defineEmits<{
  (e: 'update:modelValue', date: Date): void
}>()

const ITEM_HEIGHT = 34
const hours = [...Array(24).keys()]
const minutes = [...Array(60).keys()]

const hourWheel = ref<HTMLElement | null>(null)
const minuteWheel = ref<HTMLElement | null>(null)

// --- Scroll Logic ---
const getCenteredIndex = (scrollTop: number) => Math.round(scrollTop / ITEM_HEIGHT)
const calculateScrollTop = (index: number) => index * ITEM_HEIGHT

const setInitialScroll = () => {
  const date = props.modelValue || new Date()

  // FIX: Use nextTick
  nextTick(() => {
    if (hourWheel.value) {
      hourWheel.value.scrollTop = calculateScrollTop(date.getHours())
    }
    if (minuteWheel.value) {
      minuteWheel.value.scrollTop = calculateScrollTop(date.getMinutes())
    }
  })
}

onMounted(() => {
  setTimeout(setInitialScroll, 50)
})

watch(
  () => props.modelValue,
  () => {
    setTimeout(setInitialScroll, 50)
  },
  { deep: true },
)

const handleScroll = (unit: 'hour' | 'minute', event: Event) => {
  const target = event.target as HTMLElement
  const centeredIndex = getCenteredIndex(target.scrollTop)
  const newDate = props.modelValue ? new Date(props.modelValue) : new Date()

  let currentHour = newDate.getHours()
  let currentMinute = newDate.getMinutes()

  if (unit === 'hour') currentHour = centeredIndex % hours.length
  else if (unit === 'minute') currentMinute = centeredIndex % minutes.length

  newDate.setHours(currentHour, currentMinute, 0, 0)
  emit('update:modelValue', newDate)
}

const debouncedHandleScroll = debounce(handleScroll, 150)
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
  }
  .padding {
    height: 63px;
  }
}
</style>
