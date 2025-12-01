<template>
  <div :class="['glass-panel', `material-${material}`]">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
type Material = 'ultraThin' | 'regular' | 'thick'

interface Props {
  material?: Material
  borderRadius?: string
}

const props = withDefaults(defineProps<Props>(), {
  material: 'regular',
  borderRadius: '16px',
})
</script>

<style lang="scss" scoped>
@use '@/styles/components/GlassPanel' as *;
#scriptSetup {
  --borderRadius: v-bind('borderRadius');
}
</style>
