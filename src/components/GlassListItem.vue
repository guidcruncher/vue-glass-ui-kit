<template>
  <div :class="['glass-list-item', { 'is-interactive': interactive }]" @click="handleClick">
    <div class="list-item-leading">
      <slot name="leading"></slot>
    </div>

    <div class="list-item-content">
      <div class="list-item-title">{{ title }}</div>
      <div v-if="subtitle" class="list-item-subtitle">{{ subtitle }}</div>
    </div>

    <div class="list-item-trailing">
      <slot name="trailing">
        <span v-if="interactive" aria-hidden="true">&gt;</span>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  subtitle?: string
  interactive?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  subtitle: '',
  interactive: true,
})

const emit = defineEmits<{
  (e: 'click'): void
}>()

const handleClick = () => {
  if (props.interactive) {
    emit('click')
  }
}
</script>

<style lang="scss" scoped>
@use '@/styles/components/GlassListItem' as *;
</style>
