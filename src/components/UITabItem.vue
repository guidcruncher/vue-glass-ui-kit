<template>
  <div
    class="ui-tab-item"
    :class="{ active: isActive }"
    @click="handleClick"
    :aria-selected="isActive"
    role="tab"
  >
    <IconView :name="icon" class="ui-tab-item__icon" />
    <div class="ui-tab-item__label">{{ label }}</div>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, ref, onMounted } from 'vue'
import IconView from './IconView.vue'
import { TabBarContextKey } from '@/utils/TabBarContext'

interface Props {
  icon: string // Icon name (e.g., 'star.fill')
  label: string
}

const props = defineProps<Props>()

// --- Inject Context ---
const context = inject(TabBarContextKey)

if (!context) {
  throw new Error('UITabItem must be used within a UITabBar component.')
}

// --- Dynamic Index Assignment ---
const tabId = Symbol()
const assignedIndex = ref<number>(-1)

onMounted(() => {
  // Register with the parent on mount to get its sequential index
  assignedIndex.value = context.registerTab(tabId)
})

// --- State Calculation & Action ---
const isActive = computed(() => assignedIndex.value === context.activeTabIndex.value)

const handleClick = () => {
  // Use the assigned index to update the state in the parent UITabBar
  if (assignedIndex.value !== -1) {
    context.selectTab(assignedIndex.value)
  }
}
</script>

<style lang="scss" scoped>
.ui-tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  user-select: none;
  transition: color 0.2s ease;
  padding: 0 4px;
  color: var(--ios-text-secondary);

  &.active {
    color: var(--system-blue);
  }

  &__icon {
    font-size: 1.5em;
    margin-bottom: 3px;
  }

  &__label {
    font-size: 10px;
    font-weight: 500;
  }
}
</style>
