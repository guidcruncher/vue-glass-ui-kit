<template>
  <div class="ui-date-picker">
    <div class="picker-container">
      <div class="highlight"></div>

      <!-- Month Wheel -->
      <div class="wheel" ref="monthWheel" @scroll="debouncedHandleScroll('month', $event)">
        <div class="padding"></div>
        <div v-for="(month, index) in months" :key="index" class="item">{{ month }}</div>
        <div class="padding"></div>
      </div>

      <!-- Day Wheel -->
      <div class="wheel" ref="dayWheel" @scroll="debouncedHandleScroll('day', $event)">
        <div class="padding"></div>
        <div v-for="(day, index) in days" :key="index" class="item">{{ day }}</div>
        <div class="padding"></div>
      </div>

      <!-- Year Wheel -->
      <div class="wheel" ref="yearWheel" @scroll="debouncedHandleScroll('year', $event)">
        <div class="padding"></div>
        <div v-for="(year, index) in years" :key="index" class="item">{{ year }}</div>
        <div class="padding"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import { debounce } from '@/utils/debounce'; 

interface Props {
  modelValue: Date | null;
}
const props = defineProps<Props>();

// FIX: Correctly define emit
const emit = defineEmits<{
  (e: 'update:modelValue', date: Date): void;
}>();

const ITEM_HEIGHT = 34;
const START_YEAR = 2025;
const months = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December',
];
const days = Array.from({ length: 31 }, (_, i) => i + 1)
const years = Array.from({ length: 10 }, (_, i) => START_YEAR + i)

const monthWheel = ref<HTMLElement | null>(null)
const dayWheel = ref<HTMLElement | null>(null)
const yearWheel = ref<HTMLElement | null>(null)

// --- Scroll Logic ---
const getCenteredIndex = (scrollTop: number) => Math.round(scrollTop / ITEM_HEIGHT);
const calculateScrollTop = (index: number) => index * ITEM_HEIGHT;

const setInitialScroll = () => {
  const date = props.modelValue || new Date(); 
  
  // FIX: Use nextTick for reliable DOM calculation
  nextTick(() => {
    if (monthWheel.value) {
      monthWheel.value.scrollTop = calculateScrollTop(date.getMonth());
    }
    if (dayWheel.value) {
      dayWheel.value.scrollTop = calculateScrollTop(date.getDate() - 1);
    }
    if (yearWheel.value) {
      const yearIndex = date.getFullYear() - START_YEAR;
      if (yearIndex >= 0 && yearIndex < years.length) {
        yearWheel.value.scrollTop = calculateScrollTop(yearIndex);
      }
    }
  });
};

onMounted(() => {
  setTimeout(setInitialScroll, 50); 
});

watch(() => props.modelValue, () => {
  setTimeout(setInitialScroll, 50); 
}, { deep: true });

const handleScroll = (unit: 'month' | 'day' | 'year', event: Event) => {
  const target = event.target as HTMLElement;
  const centeredIndex = getCenteredIndex(target.scrollTop);
  const newDate = props.modelValue ? new Date(props.modelValue) : new Date();
  
  let currentYear = newDate.getFullYear();
  let currentMonth = newDate.getMonth();
  let currentDay = newDate.getDate();

  if (unit === 'month') currentMonth = centeredIndex % months.length;
  else if (unit === 'day') currentDay = (centeredIndex % days.length) + 1;
  else if (unit === 'year') currentYear = START_YEAR + (centeredIndex % years.length);

  emit('update:modelValue', new Date(currentYear, currentMonth, currentDay));
};

const debouncedHandleScroll = debounce(handleScroll, 150);
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
    top: 50%; left: 0; right: 0;
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
    &::-webkit-scrollbar { display: none; }
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
  .padding { height: 63px; }
}
</style>

