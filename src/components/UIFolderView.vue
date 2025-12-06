<script setup>
import { ref } from 'vue'
</script>

<template>
  <div class="folder-view-container">
    <div class="folder-title">
      <slot name="title"> Title </slot>
    </div>

    <div class="folder-content-area">
      <UICollectionView>
        <slot></slot>
      </UICollectionView>
    </div>
  </div>
</template>

<style scoped>
.folder-view-container {
  width: 90%;
  max-width: 450px;
  min-height: 400px;
  margin: 20px auto;
  padding: 10px 10px 20px 10px;

  background-color: var(--color-folder-bg);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-radius: 40px;

  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px 0 var(--color-folder-shadow);

  display: flex;
  flex-direction: column;
}

.folder-title {
  font-size: 32px;
  font-weight: 700;
  color: var(--color-primary-text);
  padding: 10px 20px 10px 20px;
  text-align: left;
}

.folder-content-area {
  flex-grow: 1;
  padding: 0 10px;
}

@media (max-width: 600px) {
  .folder-view-container {
    margin: 10px;
    width: auto;
  }
}
</style>
