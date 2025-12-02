<template>

<div class="ui-cell-root">
  <div class="cell">
    <div v-if="icon" class="icon-box">
      <Icon :name="icon" />
    </div>
    <div v-if="label" class="label">{{ label }}</div>
    
    <slot name="custom-content" />
    
    <div v-if="value" class="value">{{ value }}</div>
    
    <Icon v-if="accessory === 'chevron'" name="chevron" class="accessory" />
    <slot v-else-if="accessory === 'switch'" /> <!-- slot expects UISwitch component -->
  </div>
</div>

</template>

<script setup lang="ts">
import Icon from './Icon.vue'

import UISwitch from './UISwitch.vue'

const onBeforeMount = () => {}

const onMounted = () => {}

const onBeforeUnmount = () => {}

const onUnmounted = () => {}
</script>

<style scoped>

    .ui-cell-root { display: block; }
    .ui-cell-root .cell {
        display: flex; align-items: center;
        padding: 12px 16px; min-height: 48px;
        background: var(--ios-card-bg);
        border-bottom: 0.5px solid var(--ios-separator);
        font-size: 17px;
        transition: border-bottom-color 0.3s;
    }
    .ui-cell-root:last-child .cell { border-bottom: none; }
    .ui-cell-root .icon-box {
        width: 30px; height: 30px; border-radius: 6px;
        background: var(--system-blue); color: white;
        display: flex; align-items: center; justify-content: center;
        margin-right: 12px;
        flex-shrink: 0;
    }
    .ui-cell-root .icon-box svg { width: 18px; height: 18px; fill: white; }
    .ui-cell-root .label { flex: 0 0 auto; color: var(--ios-text-primary); margin-right: 10px; }
    .ui-cell-root .value { flex: 1; text-align: right; color: var(--ios-text-secondary); margin-right: 8px; }
    .ui-cell-root .accessory { color: var(--ios-text-tertiary); width: 14px; height: 14px; fill: currentColor; opacity: 0.6; flex-shrink: 0; }
  
</style>
