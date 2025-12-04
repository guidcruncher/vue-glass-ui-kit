<template>
  <div class="analog-clock-wrapper">
    <div class="analog-clock" :style="clockPanelStyle">
      <svg :width="size" :height="size" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="50"
          fill="var(--clock-face-color, #ffffff)"
          stroke="rgba(var(--clock-border-color, 0,0,0), 0.1)"
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
            stroke="var(--ios-text-tertiary, #8e8e93)"
            stroke-width="1.5"
            :transform="`rotate(${(h * 30) % 360} 50 50)`"
          />
        </g>

        <line
          class="hour-hand"
          x1="50"
          y1="55"
          x2="50"
          y2="28"
          stroke="var(--ios-text-primary, #000000)"
          stroke-width="3"
          stroke-linecap="round"
          :transform="`rotate(${hourAngle} 50 50)`"
        />

        <line
          class="minute-hand"
          x1="50"
          y1="55"
          x2="50"
          y2="15"
          stroke="var(--ios-text-primary, #000000)"
          stroke-width="2"
          stroke-linecap="round"
          :transform="`rotate(${minuteAngle} 50 50)`"
        />

        <line
          class="second-hand"
          x1="50"
          y1="55"
          x2="50"
          y2="10"
          stroke="var(--system-red, #ff3b30)"
          stroke-width="1.5"
          stroke-linecap="round"
          :transform="`rotate(${secondAngle} 50 50)`"
        />

        <circle cx="50" cy="50" r="2.5" fill="var(--ios-background, #ffffff)" stroke="var(--ios-text-tertiary, #8e8e93)" stroke-width="0.5" />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

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

type TimeUnit = 'hour' | 'minute' | 'second'

function parseTimeComponent(date: Date, timezone: string, type: TimeUnit): number {
  const options: Intl.DateTimeFormatOptions = { timeZone: timezone, [type]: '2-digit' }

  if (type === 'hour') {
    options.hourCycle = 'h23'
  }

  const formatter = new Intl.DateTimeFormat('en-US', options)
  const formattedTime = formatter.format(date)
  
  // Clean string to ensure only digits remain
  const numericalString = formattedTime.replace(/[^0-9]/g, '')
  return parseInt(numericalString, 10) || 0
}

const hour = computed(() => parseTimeComponent(currentTime.value, props.timezone, 'hour'))
const minute = computed(() => parseTimeComponent(currentTime.value, props.timezone, 'minute'))
const second = computed(() => parseTimeComponent(currentTime.value, props.timezone, 'second'))

const secondAngle = computed(() => second.value * 6)
const minuteAngle = computed(() => minute.value * 6 + second.value * 0.1)
const hourAngle = computed(
  () => (hour.value % 12) * 30 + minute.value * 0.5 + second.value * (0.5 / 60),
)

// Computed style for the container
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
.analog-clock-wrapper {
  /* Correctly bind the size prop to a CSS variable with units */
  --size: v-bind('props.size + "px"');
  
  display: flex;
  justify-content: center;
  align-items: center;

  .analog-clock {
    position: relative;
    display: flex;
    flex-direction: column;
    border-radius: 50%;
    padding: 0;

    /* Use the variable or fallback */
    width: var(--size);
    height: var(--size);

    svg {
      display: block; /* Removes weird SVG spacing issues */
      
      /* Only animate Hour and Minute. 
         Animating the Second hand causes it to spin backwards at 00s. */
      .hour-hand,
      .minute-hand {
        transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
      }
      
      /* Ensure colors apply even if variables are missing */
      .hour-hand {
        stroke: var(--clock-hand-hour, #000);
      }
      .minute-hand {
        stroke: var(--clock-hand-minute, #000);
      }
      .second-hand {
        stroke: var(--clock-hand-second, #ff3b30);
      }
    }
  }
}
</style>

