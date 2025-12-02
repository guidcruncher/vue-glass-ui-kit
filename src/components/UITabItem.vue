<template>

<div class="ui-tabitem-root">
    <div class="container">
        <Icon :name="icon" class="icon" />
        <div class="label">{{ label }}</div>
    </div>
</div>

</template>

<script setup lang="ts">
const props = defineProps<{ icon?: any | label?: any }>()

import Icon from './Icon.vue'

const onBeforeMount = () => {}

const onMounted = () => {}

const onBeforeUnmount = () => {}

const onUnmounted = () => {}
</script>

<style scoped>

    .ui-tabitem-root { flex: 1; text-align: center; color: var(--ios-text-secondary); cursor: pointer; }
    .ui-tabitem-root:hover { color: var(--system-blue); }
    .ui-tabitem-root .icon { width: 24px; height: 24px; display: block; margin: 0 auto; fill: currentColor; }
    .ui-tabitem-root .label { font-size: 10px; font-weight: 500; margin-top: 3px; }
  
</style>
