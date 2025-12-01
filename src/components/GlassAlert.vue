<template>
  <Teleport to="body">
    <div v-if="visible" class="glass-alert-overlay" @click.self="closeOnOutsideClick">
      <GlassPanel material="thick" class="glass-alert-content">
        <div class="alert-header">
          <h3>{{ title }}</h3>
        </div>
        <div class="alert-body">
          <slot>{{ message }}</slot>
        </div>
        <div class="alert-footer">
          <GlassButton variant="accent" @click="$emit('close')">
            {{ buttonText }}
          </GlassButton>
        </div>
      </GlassPanel>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { Teleport } from 'vue'
import GlassPanel from './GlassPanel.vue'
import GlassButton from './GlassButton.vue'

interface Props {
  visible: boolean
  title: string
  message?: string
  buttonText?: string
  dismissible?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  message: 'This is an important alert.',
  buttonText: 'OK',
  dismissible: false,
})

const emit = defineEmits<{
  (e: 'close'): void
}>()

const closeOnOutsideClick = () => {
  if (props.dismissible) {
    emit('close')
  }
}
</script>

<style lang="scss" scoped>
@use '@/styles/components/GlassAlert' as *;
</style>
