<template>
  <GlassPanel material="regular" class="glass-calendar">
    <div class="calendar-header">
      <GlassButton variant="text" @click="prevMonth" size="sm" aria-label="Previous Month"
        >&lt;</GlassButton
      >
      <span class="month-year">{{ currentMonthYear }}</span>
      <GlassButton variant="text" @click="nextMonth" size="sm" aria-label="Next Month"
        >&gt;</GlassButton
      >
    </div>

    <div class="day-headers">
      <div v-for="day in daysOfWeek" :key="day" class="day-header">
        {{ day }}
      </div>
    </div>

    <div class="day-grid">
      <div
        v-for="dateItem in visibleDates"
        :key="dateItem.date.getTime()"
        :class="[
          'day-cell',
          {
            'is-selected': isSelected(dateItem.date),
            'is-today': isToday(dateItem.date),
            'is-muted': dateItem.isMuted,
          },
        ]"
        @click="selectDate(dateItem.date)"
      >
        {{ dateItem.date.getDate() }}
      </div>
    </div>
  </GlassPanel>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import GlassPanel from './GlassPanel.vue'
import GlassButton from './GlassButton.vue'

interface Props {
  modelValue: Date | null
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: Date): void
}>()

const today = new Date()
const viewDate = ref(props.modelValue || today)

const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

const currentMonthYear = computed(() => {
  return viewDate.value.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
})

const nextMonth = () => {
  const newDate = new Date(viewDate.value)
  newDate.setMonth(newDate.getMonth() + 1)
  viewDate.value = newDate
}

const prevMonth = () => {
  const newDate = new Date(viewDate.value)
  newDate.setMonth(newDate.getMonth() - 1)
  viewDate.value = newDate
}

const isToday = (date: Date) => {
  return date.toDateString() === today.toDateString()
}

const isSelected = (date: Date) => {
  if (!props.modelValue) return false
  return date.toDateString() === props.modelValue.toDateString()
}

const selectDate = (date: Date) => {
  emit('update:modelValue', date)

  if (date.getMonth() !== viewDate.value.getMonth()) {
    viewDate.value = date
  }
}

const visibleDates = computed(() => {
  const dates = []
  const year = viewDate.value.getFullYear()
  const month = viewDate.value.getMonth()

  const firstOfMonth = new Date(year, month, 1)
  const startDay = firstOfMonth.getDay()

  for (let i = startDay; i > 0; i--) {
    const prevDate = new Date(year, month, 1 - i)
    dates.push({ date: prevDate, isMuted: true })
  }

  const lastDay = new Date(year, month + 1, 0).getDate()
  for (let i = 1; i <= lastDay; i++) {
    const currentDate = new Date(year, month, i)
    dates.push({ date: currentDate, isMuted: false })
  }

  const totalCells = dates.length
  const cellsNeeded = 42 - totalCells

  for (let i = 1; i <= cellsNeeded && totalCells + i <= 42; i++) {
    const nextDate = new Date(year, month + 1, i)
    dates.push({ date: nextDate, isMuted: true })
  }

  return dates
})

watch(
  () => props.modelValue,
  (newDate) => {
    if (newDate) {
      viewDate.value = newDate
    }
  },
)
</script>

<style lang="scss" scoped>
@use '@/styles/components/GlassCalendar' as *;
</style>
