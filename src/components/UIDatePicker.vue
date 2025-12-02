<template>

<div class="ui-datepicker-root">
  <div class="picker-container">
    <div class="highlight"></div>
    <div class="wheel month-wheel">
        <div class="padding"></div>
        <div v-for="m in 12" :key="m" class="item">{{ monthName(m) }}</div>
        <div class="padding"></div>
    </div>
    <div class="wheel day-wheel">
        <div class="padding"></div>
        <div v-for="d in 31" :key="d" class="item">{{ d }}</div>
        <div class="padding"></div>
    </div>
    <div class="wheel year-wheel">
        <div class="padding"></div>
        <div v-for="y in 10" :key="y" class="item">{{ 2020 + y - 1 }}</div>
        <div class="padding"></div>
    </div>
  </div>
</div>

</template>

<script setup lang="ts">

    const monthName = (m) => {
        const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        return months[m - 1];
    }
  

const onBeforeMount = () => {}

const onMounted = () => {}

const onBeforeUnmount = () => {}

const onUnmounted = () => {}
</script>

<style scoped>

    .ui-datepicker-root { display: inline-block; }
    .picker-container {
        display: flex; height: 160px;
        background: var(--ios-background);
        border-radius: 12px;
        overflow: hidden; position: relative;
        width: 300px;
        margin: 0 auto;
    }
    .highlight {
        position: absolute; top: 50%; left: 0; right: 0; height: 34px;
        background: rgba(120, 120, 128, 0.1);
        transform: translateY(-50%);
        pointer-events: none; z-index: 10;
        border-top: 0.5px solid rgba(0,0,0,0.05);
        border-bottom: 0.5px solid rgba(0,0,0,0.05);
    }
    .wheel {
        flex: 1; overflow-y: scroll;
        scroll-snap-type: y mandatory;
        height: 100%;
        scrollbar-width: none; /* Firefox */
        scroll-padding-top: 63px; /* Ensure middle item snaps to center */
        scroll-padding-bottom: 63px;
    }
    .wheel::-webkit-scrollbar { display: none; }
    .item {
        height: 34px; line-height: 34px;
        text-align: center; font-size: 19px;
        scroll-snap-align: center;
        color: var(--ios-text-primary);
    }
    .padding { height: 63px; }
    .month-wheel { flex: 2; }
  
</style>
