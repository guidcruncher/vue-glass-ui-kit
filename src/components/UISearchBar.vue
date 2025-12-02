<template>

<div class="ui-searchbar-root">
  <div class="wrapper">
    <Icon name="magnifyingglass" />
    <input type="text" :placeholder="placeholder" />
  </div>
</div>

</template>

<script setup lang="ts">
const props = defineProps<{ placeholder?: any }>()

import Icon from './Icon.vue'

const onBeforeMount = () => {}

const onMounted = () => {}

const onBeforeUnmount = () => {}

const onUnmounted = () => {}
</script>

<style scoped>

    .ui-searchbar-root { display: block; padding: 10px 16px; background: transparent; }
    .ui-searchbar-root .wrapper {
        background: var(--system-gray5);
        border-radius: 10px;
        height: 36px;
        display: flex; align-items: center;
        padding: 0 8px;
        color: var(--ios-text-secondary);
    }
    .ui-searchbar-root svg { width: 16px; height: 16px; margin-right: 6px; fill: currentColor; opacity: 0.6; flex-shrink: 0;}
    .ui-searchbar-root input {
        border: none; background: transparent;
        font-size: 17px; width: 100%; outline: none;
        color: var(--ios-text-primary);
        font-family: inherit;
    }
    .ui-searchbar-root input::placeholder { color: var(--ios-text-secondary); }
  
</style>
