<script setup>
import { computed } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },

  layoutConfig: {
    type: Object,
    default: () => ({
      columns: 3,
      gap: '16px',
    }),
  },
})

const gridStyle = computed(() => ({
  display: 'grid',
  'grid-template-columns': `repeat(${props.layoutConfig.columns}, 1fr)`,
  gap: props.layoutConfig.gap,
}))

const emit = defineEmits(['item-selected'])

const selectItem = (item, index) => {
  emit('item-selected', { item, index })
}
</script>

<template>
  <div class="collection-view" :style="gridStyle">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="collection-view-cell"
      @click="selectItem(item, index)"
    >
      <slot :item="item" :index="index" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/components/GlassCollectionContainer' as *;
</style>
