<template>

</template>

<script setup lang="ts">
// Icon component – unchanged
import { ref, watch } from 'vue'
interface Props { name?: string; class?: string }
const props = defineProps<Props>()
const svgContent = ref('')
const loadIcon = async () => {
  if (!props.name) return
  try { const m = await import(`@/icons/${props.name}.svg?raw`); svgContent.value = m.default }
  catch { console.warn('[Icon] load failed') }
}
watch(() => props.name, loadIcon, { immediate: true })
</script>
