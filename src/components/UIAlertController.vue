<template>
  <Teleport to="body">
    <div v-if="isVisible" :class="['alert-overlay', { visible: isVisible }]" @click.self="close">
      <div class="alert-box">
        <div class="content">
          <div class="title">{{ title }}</div>
          <div class="message">{{ message }}</div>
        </div>
        <div class="actions">
          <div
            v-for="(action, index) in parsedActions"
            :key="index"
            :class="['btn', action.style]"
            @click="handleAction(action)"
          >
            {{ action.text }}
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

interface Action {
  text: string
  style: 'default' | 'cancel' | 'destructive'
}

interface Props {
  title: string
  message: string
  actions: string // JSON string from the original HTML
}

const props = defineProps<Props>()
const emit = defineEmits(['action', 'close'])

const isVisible = ref(false)

const parsedActions = computed<Action[]>(() => {
  try {
    return JSON.parse(props.actions) as Action[]
  } catch {
    return []
  }
})

const close = () => {
  isVisible.value = false
  emit('close')
}

const show = () => {
  isVisible.value = true
}

const handleAction = (action: Action) => {
  emit('action', action)
  close()
}

// Expose show/close methods to the template ref usage
defineExpose({ show, close })
</script>

<style lang="scss" scoped>
.alert-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;

  // Backdrop effect
  background: rgba(0, 0, 0, 0.4);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
  backdrop-filter: blur(2px);

  &.visible {
    opacity: 1;
    pointer-events: auto;
  }

  .alert-box {
    width: 270px;
    background: var(--glass-bg);
    backdrop-filter: blur(30px) saturate(180%);
    -webkit-backdrop-filter: blur(30px) saturate(180%);
    border-radius: 14px;
    text-align: center;
    overflow: hidden;
    transform: scale(1.1);
    transition: transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);

    .visible & {
      transform: scale(1);
    }
  }

  .content {
    padding: 20px 16px;
  }

  .title {
    font-weight: 600;
    font-size: 17px;
    margin-bottom: 4px;
    color: var(--ios-text-primary);
  }

  .message {
    font-size: 13px;
    color: var(--ios-text-primary);
    line-height: 1.4;
  }

  .actions {
    display: flex;
    flex-direction: row;
    border-top: 0.5px solid var(--ios-separator);

    .btn {
      flex: 1;
      padding: 12px;
      font-size: 17px;
      color: var(--system-blue);
      cursor: pointer;
      border-right: 0.5px solid var(--ios-separator);
      background: rgba(255, 255, 255, 0.05);
      user-select: none;

      &:last-child {
        border-right: none;
      }

      &:active {
        background: rgba(0, 0, 0, 0.1);
      }

      &.default {
        font-weight: 600;
      }

      &.destructive {
        color: var(--system-red);
      }
    }
  }
}
</style>
