<template>
  <div border-radius="0" class="glass-navbar" role="navigation">
    <div class="navbar-left">
      <slot name="left-action">
        <GlassButton variant="text" v-if="backLink" @click="$emit('back')">
          <span aria-hidden="true">&lt;</span> Back
        </GlassButton>
      </slot>
    </div>

    <div class="navbar-title">{{ title }}</div>

    <div class="navbar-right">
      <slot name="right-action"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import GlassPanel from './GlassPanel.vue'
import GlassButton from './GlassButton.vue'

interface Props {
  title: string
  backLink?: boolean
}

withDefaults(defineProps<Props>(), {
  backLink: false,
})

defineEmits<{
  (e: 'back'): void
}>()
</script>

<style lang="scss" scoped>
@use '@/styles/components/GlassNavBar' as *;
</style>
