<template>
  <div class="full-page-container">
    <header
      v-if="($slots.header && $slots.menubar) || $slots.header"
      :class="$slots.menubar ? 'sticky-header-menu' : 'sticky-header'"
    >
      <slot name="header"></slot>
      <slot name="menubar"></slot>
    </header>

    <main class="scrollable-content">
      <div style="width: 99%">
        <slot name="body"></slot>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@use '@/styles/components/Container' as *;
</style>
