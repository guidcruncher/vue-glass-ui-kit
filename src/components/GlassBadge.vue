<template>
  <span :class="['glass-badge', `variant-${variant}`]">
    <slot>{{ count }}</slot>
  </span>
</template>

<script setup lang="ts">
type BadgeVariant = 'standard' | 'danger' | 'success'

interface Props {
  count?: number
  variant?: BadgeVariant
}

withDefaults(defineProps<Props>(), {
  count: 0,
  variant: 'standard',
})
</script>

<style lang="scss" scoped>
@use '@/styles/components/GlassBadge' as *;
</style>
