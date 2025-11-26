<template>
  <GlassPanel material="ultraThin" class="glass-digital-clock">
    <svg width="0" height="0" style="position: absolute; visibility: hidden">
      <defs>
        <filter id="inner-blur">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>

    <div class="time-display">
      {{ formattedTime }}
    </div>
    <div v-if="showDate" class="date-display">
      {{ formattedDate }}
    </div>
    <div v-if="showTimezone" class="timezone-label">
      {{ timezoneLabel }}
    </div>
  </GlassPanel>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import GlassPanel from './GlassPanel.vue'

interface Props {
  timezone?: string
  showDate?: boolean
  showTimezone?: boolean
  format12Hour?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  showDate: true,
  showTimezone: true,
  format12Hour: true,
})

const currentTime = ref(new Date())
let interval: number

const formatOptions = computed(() => ({
  timeZone: props.timezone,
  hour: '2-digit',
  minute: '2-digit',
  hour12: props.format12Hour,
}))

const formattedTime = computed(() => {
  try {
    return currentTime.value.toLocaleTimeString(
      'en-US',
      formatOptions.value as Intl.DateTimeFormatOptions,
    )
  } catch (e) {
    return 'Invalid Timezone'
  }
})

const formattedDate = computed(() => {
  try {
    return currentTime.value.toLocaleDateString('en-US', {
      timeZone: props.timezone,
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    })
  } catch (e) {
    return ''
  }
})

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

const updateTime = () => {
  currentTime.value = new Date()
}

onMounted(() => {
  updateTime()
  interval = window.setInterval(updateTime, 1000)
})

onUnmounted(() => {
  clearInterval(interval)
})

watch(() => props.timezone, updateTime)
</script>

<style lang="scss" scoped>
@use '@/styles/components/GlassDigitalClock' as *;
</style>
