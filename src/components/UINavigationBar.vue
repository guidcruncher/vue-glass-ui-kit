<template>

<div class="ui-navbar-root">
  <div class="slot-container"><slot name="left"></slot></div>
  <div class="title">{{ title }}</div>
  <div class="slot-container" style="justify-content: flex-end;"><slot name="right"></slot></div>
</div>

</template>

<script setup lang="ts">
const props = defineProps<{ title?: any }>()

import UIButton from './UIButton.vue'

const onBeforeMount = () => {}

const onMounted = () => {}

const onBeforeUnmount = () => {}

const onUnmounted = () => {}
</script>

<style scoped>

    .ui-navbar-root {
      position: sticky; top: 0; z-index: 100;
      height: 44px; display: flex; align-items: center; justify-content: space-between;
      padding: 0 16px; width: 100%;
      background: var(--glass-bg);
      backdrop-filter: blur(25px) saturate(180%);
      -webkit-backdrop-filter: blur(25px) saturate(180%);
      border-bottom: 1px solid var(--glass-border);
    }
    .ui-navbar-root .title {
      position: absolute; left: 50%; transform: translateX(-50%);
      font-weight: 600; font-size: 17px; color: var(--ios-text-primary);
    }
    .ui-navbar-root .slot-container {
        display: flex; align-items: center; min-width: 80px;
    }
  
</style>
