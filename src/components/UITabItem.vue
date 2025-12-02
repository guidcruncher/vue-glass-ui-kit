<template>
  <div class="ui-tab-item" :class="{ active: isActive }" @click="handleClick">
    <IconView :name="icon" class="ui-tab-item__icon" />
    <div class="ui-tab-item__label">{{ label }}</div>
  </div>
</template>

<script lang="ts" setup>
import IconView from './IconView.vue' // Assuming IconView is available
import { ref, computed } from 'vue'

interface Props {
  icon: string
  label: string
  index: number
  isActive: boolean // Managed by the parent UITabBar
}

const props = defineProps<Props>()
const emit = defineEmits(['select'])

const handleClick = () => {
  emit('select', props.index)
}
</script>

<style lang="scss" scoped>
.ui-tab-item {
  flex: 1;
  text-align: center;
  color: var(--ios-text-secondary);
  cursor: pointer;
  user-select: none;
  transition: color 0.2s ease;

  &.active {
    color: var(--system-blue); // Active tabs get the system blue color
  }

  &__icon {
    width: 24px;
    height: 24px;
    margin: 0 auto;
    display: block;
    fill: currentColor;
    margin-bottom: 4px;
  }

  &__label {
    font-size: 10px;
    font-weight: 500;
    margin-top: 3px;
  }
}
</style>
