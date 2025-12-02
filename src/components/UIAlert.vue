<template>

<div v-if="isVisible" class="ui-alert-backdrop">
  <div class="alert-box">
    <div class="content">
      <div class="title">{{ title }}</div>
      <div class="message">{{ message }}</div>
    </div>
    <div class="actions">
      <div 
        v-for="(action, index) in actions" 
        :key="index" 
        class="btn" 
        :class="action.style" 
        @click="$emit('close')"
      >
        {{ action.text }}
      </div>
    </div>
  </div>
</div>

</template>

<script setup lang="ts">
const emit = defineEmits<{

  'close': (payload?: any) => true

}>()

const onBeforeMount = () => {}

const onMounted = () => {}

const onBeforeUnmount = () => {}

const onUnmounted = () => {}
</script>

<style scoped>

    .ui-alert-backdrop {
        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        z-index: 9999; display: flex; align-items: center; justify-content: center;
        background: rgba(0,0,0,0.4); 
        backdrop-filter: blur(2px);
        transition: opacity 0.2s;
    }
    .alert-box {
        width: 270px; background: var(--glass-bg);
        backdrop-filter: blur(30px) saturate(180%);
        -webkit-backdrop-filter: blur(30px) saturate(180%);
        border-radius: 14px; text-align: center; overflow: hidden;
        transition: transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
        box-shadow: 0 10px 40px rgba(0,0,0,0.2);
    }
    .content { padding: 20px 16px; }
    .title { font-weight: 600; font-size: 17px; margin-bottom: 4px; color: var(--ios-text-primary); }
    .message { font-size: 13px; color: var(--ios-text-primary); line-height: 1.4; }
    .actions { display: flex; flex-direction: row; border-top: 0.5px solid var(--ios-separator); }
    .btn {
        flex: 1; padding: 12px; font-size: 17px; color: var(--system-blue); cursor: pointer;
        border-right: 0.5px solid var(--ios-separator); background: rgba(255,255,255,0.05);
        transition: background 0.1s;
    }
    .btn:last-child { border-right: none; }
    .btn:active { background: rgba(0,0,0,0.1); }
    .btn.default { font-weight: 600; }
  
</style>
