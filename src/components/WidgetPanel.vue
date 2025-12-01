<template>
  <div class="widget">
    <div class="widget-header">
      <slot name="header">
        <div class="widget-icon"></div>
        <span class="widget-title">My App</span>
      </slot>
    </div>

    <slot>
      <div class="widget-primary-metric">15:45</div>

      <p class="widget-detail-text">Central London, Sunny</p>

      <a href="#" class="widget-link">View Details</a>
    </slot>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
})
</script>

<style lang="scss" scoped>
@use '@/styles/components/WidgetPanel' as *;
</style>
