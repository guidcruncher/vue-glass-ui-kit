<template>

<div class="ui-tabbar-root">
    <slot></slot>
</div>

</template>

<script setup lang="ts">
const props = defineProps<{
  activeIndex?: number
}>()

const onBeforeMount = () => {}

const onMounted = () => {}

const onBeforeUnmount = () => {}

const onUnmounted = () => {}
</script>

<style scoped>

    .ui-tabbar-root {
        position: fixed; bottom: 0; left: 0; right: 0;
        height: 83px; background: var(--glass-bg);
        backdrop-filter: blur(25px) saturate(180%);
        -webkit-backdrop-filter: blur(25px) saturate(180%);
        border-top: 1px solid var(--glass-border);
        display: flex; justify-content: space-around;
        padding-top: 10px; padding-bottom: 34px;
        z-index: 1000;
        transition: background 0.3s, border-color 0.3s;
    }
  
</style>
