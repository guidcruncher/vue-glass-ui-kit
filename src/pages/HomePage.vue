<template>
  <div>
    <UINavigationBar title="Desktop">
      <template #left> </template>
      <template #right>
        <UIThemeChooser />
      </template>
    </UINavigationBar>
    <UIDesktopRenderer :yamlSource="desktopYaml" />
  </div>
</template>

<script setup>
import { inject } from 'vue'

// Inject the YAML data provided in main.js
const desktopYaml = inject('desktopYaml')

// Ensure the DesktopRenderer and its subcomponents (UIAppIconItem, etc.)
// are correctly imported and available in your project's component structure.
</script>

<style scoped>
/*
  This style ensures the page component itself doesn't interfere with the 
  full-screen rendering of the DesktopRenderer.
*/
.desktop-page {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
