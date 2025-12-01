<script setup lang="ts">
import { computed } from 'vue'

// Define the structure for an individual app item
interface App {
  id: setring
  name: string
  icon: string // This can now be text, emoji, or a URL
  color: string
}

const props = withDefaults(
  defineProps<{
    modelValue: App[]
    columns?: string
  }>(),
  {
    modelValue: [],
    columns: '5',
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: App[]): void
  (e: 'click', value: App): void
}>()

const appsList = computed(() => props.modelValue)

const inlineStyles = computed(() => [{ '--appfolder-columns': props.columns }])

// Function to check if the icon string is a URL
const isImageUrl = (icon: string): boolean => {
  return icon.startsWith('http')
}

const handleClick = (app) => {
  alert(app.name)
  emit('click', app)
}
</script>

<template>
  <div class="folder-container" :style="inlineStyles">
    <h1 class="folder-title">Lifestyle</h1>

    <div class="folder-panel">
      <div class="apps-grid">
        <div v-for="(app, index) in appsList" :key="index" class="app-item">
          <ImageButton size="64" :imageurl="app.icon" @click="handleClick(app)" />
          <div class="app-name">{{ app.name }}</div>
        </div>
      </div>
      <div v-if="!appsList || appsList.length === 0" class="text-white text-center mt-8">
        No lifestyle apps configured.
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/components/AppFolder' as *;
</style>
