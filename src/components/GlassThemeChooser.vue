<template>
  <div v-if="mode == 'normal'">
    <GlassPanel material="regular" class="glass-theme-chooser">
      <div class="chooser-header">
        <span class="chooser-title">App Theme</span>
        <GlassBadge variant="standard">
          {{ themeStore.currentTheme.charAt(0).toUpperCase() + themeStore.currentTheme.slice(1) }}
        </GlassBadge>
      </div>

      <div class="theme-options">
        <div
          v-for="theme in themeStore.availableThemes"
          :key="theme"
          :class="['theme-option-item', { 'is-active': theme === themeStore.currentTheme }]"
          @click="themeStore.setTheme(theme)"
          role="radio"
          :aria-checked="theme === themeStore.currentTheme"
          tabindex="0"
        >
          <span class="theme-icon">{{ getIcon(theme) }}</span>
          <span class="theme-label">{{ theme.charAt(0).toUpperCase() + theme.slice(1) }}</span>
        </div>
      </div>
    </GlassPanel>
  </div>
  <div v-if="mode == 'compact'">
    <GlassImageButton size="64" variant="accent" @click="themeStore.setTheme(toggleTheme())">{{
      getIcon(toggleTheme())
    }}</GlassImageButton>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from '../stores/themeStore'
import GlassPanel from './GlassPanel.vue'
import GlassBadge from './GlassBadge.vue'

const themeStore = useThemeStore()

interface Props {
  mode?: string
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'normal',
})

const getIcon = (theme: string) => {
  return theme === 'light' ? '☀️' : '🌙'
}

const toggleTheme = () => {
  return themeStore.currentTheme == 'dark' ? 'light' : 'dark'
}
</script>

<style lang="scss" scoped>
@use '@/styles/components/GlassThemeChooser' as *;
</style>
