<template>
  <div class="glass-datepicker">
    <GlassInput
      :modelValue="formattedDate"
      placeholder="Select Date"
      type="text"
      @click="togglePicker"
      readonly
      class="date-input-field"
      ref="inputRef"
    />

    <Teleport to="body">
      <GlassPanel
        v-if="isOpen"
        material="regular"
        class="date-picker-dropdown"
        :style="dropdownStyle"
      >
        <div class="date-picker-controls">
          <GlassButton variant="text" @click="prevMonth">&lt;</GlassButton>
          <span class="month-year">{{ currentMonthYear }}</span>
          <GlassButton variant="text" @click="nextMonth">&gt;</GlassButton>
        </div>

        <div class="day-grid">
          <div v-for="day in daysOfWeek" :key="day" class="day-header">{{ day }}</div>
          <div
            v-for="dateItem in visibleDates"
            :key="dateItem.date.getTime()"
            :class="[
              'day-cell',
              {
                'is-selected': isSelected(dateItem.date),
                'is-today': isToday(dateItem.date),
                'is-outside-month': !dateItem.isCurrentMonth,
              },
            ]"
            @click="dateItem.isCurrentMonth && selectDate(dateItem.date)"
          >
            {{ dateItem.date.getDate() }}
          </div>
        </div>
      </GlassPanel>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onBeforeUnmount } from 'vue'
import GlassInput from './GlassInput.vue'
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
  (e: 'close'): void
}>()

const isOpen = ref(false)
const viewDate = ref(props.modelValue || new Date())
const inputRef = ref<InstanceType<typeof GlassInput> | null>(null)
const dropdownStyle = ref({})

const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

const updateDropdownPosition = async () => {
  if (!isOpen.value || !inputRef.value) return

  const inputEl = inputRef.value.$el as HTMLElement | null

  if (inputEl) {
    const rect = inputEl.getBoundingClientRect()
    dropdownStyle.value = {
      position: 'absolute',

      top: `${rect.bottom + 8}px`,
      left: `${rect.left}px`,
      zIndex: 8000,
    }
  }
}

watch(isOpen, (newVal) => {
  if (newVal) {
    nextTick(updateDropdownPosition)
    window.addEventListener('resize', updateDropdownPosition)
    window.addEventListener('scroll', updateDropdownPosition, true)
  } else {
    window.removeEventListener('resize', updateDropdownPosition)
    window.removeEventListener('scroll', updateDropdownPosition, true)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateDropdownPosition)
  window.removeEventListener('scroll', updateDropdownPosition, true)
})

const formattedDate = computed(() => {
  if (!props.modelValue) return ''
  return props.modelValue.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
})

const currentMonthYear = computed(() => {
  return viewDate.value.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
})

const visibleDates = computed(() => {
  const dates = []
  const currentDate = viewDate.value
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstOfMonth = new Date(year, month, 1)

  const startDayOfWeek = firstOfMonth.getDay()

  const startDate = new Date(firstOfMonth)
  startDate.setDate(firstOfMonth.getDate() - startDayOfWeek)

  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)

    const isCurrentMonth = date.getMonth() === month

    dates.push({
      date: date,
      isCurrentMonth: isCurrentMonth,
    })
  }

  return dates
})

const isSelected = (date: Date) => {
  if (!props.modelValue) return false
  return date.toDateString() === props.modelValue.toDateString()
}

const isToday = (date: Date) => {
  return date.toDateString() === new Date().toDateString()
}

const nextMonth = () => {
  viewDate.value = new Date(viewDate.value.setMonth(viewDate.value.getMonth() + 1))
}

const prevMonth = () => {
  viewDate.value = new Date(viewDate.value.setMonth(viewDate.value.getMonth() - 1))
}

const selectDate = (date: Date) => {
  emit('update:modelValue', date)
  emit('close')
  closePicker()
}

const togglePicker = () => {
  isOpen.value = !isOpen.value
  if (props.modelValue) {
    viewDate.value = props.modelValue
  }
}

const closePicker = () => {
  isOpen.value = false
}

watch(
  () => props.modelValue,
  (newDate) => {
    if (newDate) viewDate.value = newDate
  },
)
</script>

<style lang="scss" scoped>
@use '@/styles/components/GlassDatePicker' as *;
</style>
