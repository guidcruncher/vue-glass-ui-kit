<template>
  <div class="clock-container">
    <div class="clock-card">
      <div class="time-display">
        <FlipCard :value="hours[0]" :prev-value="prevHours[0]" />
        <FlipCard :value="hours[1]" :prev-value="prevHours[1]" />

        <div class="colon">
          <div class="dot"></div>
          <div class="dot"></div>
        </div>

        <FlipCard :value="minutes[0]" :prev-value="prevMinutes[0]" />
        <FlipCard :value="minutes[1]" :prev-value="prevMinutes[1]" />

        <div v-if="showSeconds" class="colon">
          <div class="dot"></div>
          <div class="dot"></div>
        </div>

        <FlipCard v-if="showSeconds" :value="seconds[0]" :prev-value="prevSeconds[0]" />
        <FlipCard v-if="showSeconds" :value="seconds[1]" :prev-value="prevSeconds[1]" />
      </div>

      <div class="date-display">
        <span v-if="showDate">{{ formattedDate }}</span
        >&nbsp;<span v-if="showTimezone">{{ timezoneLabel }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import FlipCard from './FlipCard.vue'

interface Props {
  timezone?: string
  showDate?: boolean
  showTimezone?: boolean
  showSeconds?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  showDate: true,
  showTimezone: true,
  showSeconds: false,
})

const emit = defineEmits(['tick'])

const timezoneLabel = computed(() => {
  try {
    const parts = props.timezone.split('/')

    const city = parts[parts.length - 1].replace(/_/g, ' ')

    const timeZoneAbbreviation = currentTime.value
      .toLocaleTimeString('en-US', {
        timeZone: props.timezone,
        timeZoneName: 'short',
      })
      .split(' ')
      .pop()

    return `${city} (${timeZoneAbbreviation})`
  } catch (e) {
    return props.timezone
  }
})

const tzDate = () => {
  const date = new Date()
  var invdate = new Date(date.toLocaleString('en-US', { timeZone: props.timezone }))
  var diff = date.getTime() - invdate.getTime()
  return new Date(date.getTime() - diff)
}

const time = ref(tzDate())
const prevTime = ref(tzDate())
let timer = null

onMounted(() => {
  timer = setInterval(() => {
    prevTime.value = time.value
    time.value = tzDate()
    if (time.value.getMinutes() != prevTime.value.getMinutes()) {
      emit('tick')
    }
  }, 1000)
})

onUnmounted(() => clearInterval(timer))

const formatNumber = (n) => String(n).padStart(2, '0')

const hours = computed(() => formatNumber(time.value.getHours()))
const minutes = computed(() => formatNumber(time.value.getMinutes()))
const seconds = computed(() => formatNumber(time.value.getSeconds()))

const prevHours = computed(() => formatNumber(prevTime.value.getHours()))
const prevMinutes = computed(() => formatNumber(prevTime.value.getMinutes()))
const prevSeconds = computed(() => formatNumber(prevTime.value.getSeconds()))

const formattedDate = computed(() => {
  try {
    return time.value.toLocaleDateString('en-US', {
      timeZone: props.timezone,
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    })
  } catch (e) {
    return ''
  }
})
</script>

<style lang="scss" scoped>
@use '@/styles/components/FlipClock' as *;
</style>
