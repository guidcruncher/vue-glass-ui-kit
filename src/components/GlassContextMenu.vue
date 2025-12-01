<template>
  <Teleport to="body">
    <div v-if="visible" class="glass-context-menu-wrapper" @click.self="close">
      <GlassPanel material="thick" class="glass-context-menu" :style="menuPosition" @click="close">
        <div v-for="(item, index) in items" :key="index" class="menu-item" @click="item.action">
          {{ item.label }}
        </div>
      </GlassPanel>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, Teleport, computed } from 'vue'
import GlassPanel from './GlassPanel.vue'

interface MenuItem {
  label: string
  action: () => void
}

interface Props {
  items: MenuItem[]
}

const props = defineProps<Props>()

const visible = ref(false)
const x = ref(0)
const y = ref(0)

const show = (event: MouseEvent | TouchEvent) => {
  event.preventDefault()
  const clientX = 'clientX' in event ? event.clientX : event.touches[0].clientX
  const clientY = 'clientY' in event ? event.clientY : event.touches[0].clientY

  x.value = clientX
  y.value = clientY

  visible.value = true
}

const close = () => {
  visible.value = false
}

const menuPosition = computed(() => {
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  const menuWidth = 200
  const menuHeight = props.items.length * 40 + 20

  const left = x.value + menuWidth > viewportWidth ? x.value - menuWidth : x.value
  const top = y.value + menuHeight > viewportHeight ? y.value - menuHeight : y.value

  return {
    left: `${left}px`,
    top: `${top}px`,
  }
})

defineExpose({ show, close })
</script>

<style lang="scss" scoped>
@use '@/styles/components/GlassContextMenu' as *;
</style>
