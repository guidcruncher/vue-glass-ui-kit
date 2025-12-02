<template>
  <div class="ui-tab-bar">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  activeIndex?: number;
}
const props = withDefaults(defineProps<Props>(), {
  activeIndex: 0,
});
// The active index logic would typically be managed by the parent view
// which passes the state down to the TabItems via a provide/inject or slot props.
</script>

<style lang="scss" scoped>
.ui-tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 83px; // 49px tab area + 34px iPhone X safe area (original style)
  z-index: 1000;

  display: flex;
  justify-content: space-around;
  padding-top: 10px;
  padding-bottom: 34px; // Account for the home indicator/safe area

  // Liquid Glass Effect
  background: var(--glass-bg);
  backdrop-filter: blur(25px) saturate(180%);
  -webkit-backdrop-filter: blur(25px) saturate(180%);
  border-top: 1px solid var(--glass-border);
}
</style>
