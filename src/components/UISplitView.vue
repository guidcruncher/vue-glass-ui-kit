<template>

<div class="ui-splitview-root">
  <div class="master">
    <slot name="master"></slot>
  </div>
  <div class="detail">
    <slot name="detail"></slot>
  </div>
</div>

</template>

<script setup lang="ts">
const onBeforeMount = () => {}

const onMounted = () => {}

const onBeforeUnmount = () => {}

const onUnmounted = () => {}
</script>

<style scoped>

    .ui-splitview-root {
        display: flex;
        flex-direction: column; /* Mobile stack by default */
        width: 100%;
        min-height: 100vh;
    }
    .master {
        display: none; /* Master pane hidden on mobile by default */
    }
    .detail {
        flex-grow: 1;
        min-height: 100vh;
    }

    @media (min-width: 768px) {
        .ui-splitview-root {
            flex-direction: row;
        }
        .master {
            display: block;
            flex: 0 0 320px;
            max-width: 40%;
            overflow-y: auto;
        }
        .detail {
            flex-grow: 1;
            overflow-y: auto;
        }
    }
  
</style>
