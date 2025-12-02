<template>
  <div class="ui-activity-indicator" :class="{ 'is-animating': animating }">
    <div class="spinner">
      <div v-for="i in 12" :key="i" class="bar" :style="getBarStyle(i)"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  animating?: boolean | string // Use boolean | string for prop to handle HTML attribute presence
}

const props = defineProps<Props>()

const animating = props.animating === true || props.animating === 'true' || props.animating === ''

const getBarStyle = (i: number) => {
  return {
    transform: `rotate(${(i - 1) * 30}deg) translate(0, -140%)`,
    // Stagger animation delay to create the spinning effect
    animationDelay: `-${1.2 - (i - 1) * 0.1}s`,
  }
}
</script>

<style lang="scss" scoped>
.ui-activity-indicator {
  display: inline-block;
  vertical-align: middle;

  .spinner {
    width: 20px;
    height: 20px;
    position: relative;
    display: inline-block;
    vertical-align: middle;
  }

  .bar {
    width: 8%;
    height: 25%;
    background: var(--ios-text-secondary);
    position: absolute;
    left: 46%;
    top: 40%;
    border-radius: 5px;
    opacity: 0.25;
    transform-origin: 0 0; // Rotate around the center of the spinner

    // Default to paused if not animating
    animation: fade 1s linear infinite paused;
  }

  &.is-animating .bar {
    animation-play-state: running;
  }

  @keyframes fade {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0.25;
    }
  }
}
</style>

*** ## 6. UIProgressView (`UIProgressView.vue`) A simple progress bar. ```vue
<template>
  <div class="ui-progress-view">
    <div class="track">
      <div class="fill" :style="{ width: `${progressValue}%` }"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

interface Props {
  value?: number | string // 0 to 100
}

const props = withDefaults(defineProps<Props>(), {
  value: 0,
})

const progressValue = computed(() => {
  const val = parseFloat(props.value.toString())
  return Math.max(0, Math.min(100, val))
})
</script>

<style lang="scss" scoped>
.ui-progress-view {
  display: block;
  width: 100%;

  .track {
    height: 4px;
    background: var(--system-gray5);
    border-radius: 2px;
    overflow: hidden;
  }

  .fill {
    height: 100%;
    background: var(--system-blue);
    transition: width 0.3s ease;
  }
}
</style>
