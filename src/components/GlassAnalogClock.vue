<template>
  <GlassPanel material="regular" class="glass-analog-clock" :style="clockPanelStyle">
    <svg :width="size" :height="size" viewBox="0 0 100 100">
      <circle
        cx="50"
        cy="50"
        r="50"
        fill="transparent"
        stroke="rgba(var(--color-glass-rgb), 0.2)"
        stroke-width="1"
      />

      <g class="hour-markers">
        <line
          v-for="h in 12"
          :key="h"
          x1="50"
          y1="2"
          x2="50"
          y2="7"
          stroke="var(--color-label-tertiary)"
          stroke-width="1.5"
          :transform="`rotate(${(h * 30) % 360} 50 50)`"
        />
      </g>

      <line
        class="hour-hand"
        x1="50"
        y1="50"
        x2="50"
        y2="28"
        stroke="var(--color-label-primary)"
        stroke-width="3"
        stroke-linecap="round"
        :transform="`rotate(${hourAngle} 50 50)`"
      />

      <line
        class="minute-hand"
        x1="50"
        y1="50"
        x2="50"
        y2="15"
        stroke="var(--color-label-primary)"
        stroke-width="2"
        stroke-linecap="round"
        :transform="`rotate(${minuteAngle} 50 50)`"
      />

      <line
        class="second-hand"
        x1="50"
        y1="50"
        x2="50"
        y2="10"
        stroke="var(--color-error)"
        stroke-width="1"
        stroke-linecap="round"
        :transform="`rotate(${secondAngle} 50 50)`"
      />

      <circle cx="50" cy="50" r="3" fill="var(--color-accent)" />
    </svg>
  </GlassPanel>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import GlassPanel from './GlassPanel.vue'

interface Props {
  size?: number
  timezone?: string
  showLabel?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 150,
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  showLabel: false,
})

const emit = defineEmits(['tick'])

const prevTime = ref(new Date())
const currentTime = ref(new Date())
let interval: number

const hour = computed(() => {
  const formatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    hourCycle: 'h23',
    timeZone: props.timezone,
  })
  return parseInt(formatter.format(currentTime.value))
})

const minute = computed(() => {
  const formatter = new Intl.DateTimeFormat('en-US', {
    minute: 'numeric',
    timeZone: props.timezone,
  })
  return parseInt(formatter.format(currentTime.value))
})

const second = computed(() => {
  const formatter = new Intl.DateTimeFormat('en-US', {
    second: 'numeric',
    timeZone: props.timezone,
  })
  return parseInt(formatter.format(currentTime.value))
})

const secondAngle = computed(() => second.value * 6)
const minuteAngle = computed(() => minute.value * 6 + second.value * 0.1)
const hourAngle = computed(
  () => (hour.value % 12) * 30 + minute.value * 0.5 + second.value * (0.5 / 60),
)

const timeLabel = computed(() => {
  try {
    const parts = props.timezone.split('/')
    const city = parts[parts.length - 1].replace(/_/g, ' ')
    const time = currentTime.value.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: props.timezone,
    })
    return `${city} (${time})`
  } catch (e) {
    return `Error: Invalid Timezone`
  }
})

const clockPanelStyle = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
}))

onMounted(() => {
  interval = window.setInterval(() => {
    prevTime.value = currentTime.value
    currentTime.value = new Date()
    if (prevTime.value.getMinutes() != currentTime.value.getMinutes()) {
      emit('tick')
    }
  }, 1000)
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>

<style lang="scss" scoped>
@use '@/styles/components/GlassAnalogClock' as *;
scriptSetup {
  --size: v-bind('size');
}
</style>
