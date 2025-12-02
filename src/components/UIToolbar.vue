<template>

<div class="ui-toolbar-root">
    <slot></slot>
</div>

</template>

<script setup lang="ts">
const onBeforeMount = () => {}

const onMounted = () => {}

const onBeforeUnmount = () => {}

const onUnmounted = () => {}
</script>

<style scoped>

    .ui-toolbar-root {
        display: flex; align-items: center; width: 100%;
        height: 44px; padding: 0 16px; gap: 10px;
        background: var(--glass-bg);
        backdrop-filter: blur(25px) saturate(180%);
        -webkit-backdrop-filter: blur(25px) saturate(180%);
        border-top: 1px solid var(--glass-border);
        margin-top: 20px;
    }
  
</style>
