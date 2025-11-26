<template>
  <GlassPanel material="thick" border-radius="0" class="glass-tab-bar" role="tablist">
    <div
      v-for="item in items"
      :key="item.value"
      :class="['tab-item', { 'is-active': modelValue === item.value }]"
      @click="selectTab(item.value)"
      role="tab"
      :aria-selected="modelValue === item.value"
    >
      <div class="tab-icon">
        <slot :name="item.iconSlot || item.value + '-icon'">
          <span>{{ item.label[0] }}</span>
        </slot>
      </div>
      <div class="tab-label">{{ item.label }}</div>
    </div>
  </GlassPanel>
</template>

<script setup lang="ts">
import GlassPanel from './GlassPanel.vue'

interface TabItem {
  label: string
  value: string
  iconSlot?: string
}

interface Props {
  modelValue: string
  items: TabItem[]
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'click', value: string): void
}>()

const selectTab = (value: string) => {
  emit('update:modelValue', value)
  emit('click', value)
}
</script>

<style lang="scss" scoped>
@use '@/styles/components/GlassTabBar' as *;
</style>
