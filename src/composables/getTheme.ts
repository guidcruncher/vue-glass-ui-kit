import { onMounted, onUnmounted, ref } from 'vue'

export function getTheme() {
  const isDark = ref(document.documentElement.classList.contains('dark'))
  let observer = null

  const updateTheme = (mutationsList) => {
    if (mutationsList.some((mutation) => mutation.attributeName === 'class')) {
      isDark.value = document.documentElement.classList.contains('dark')
    }
  }

  onMounted(() => {
    observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, { attributes: true })

    isDark.value = document.documentElement.classList.contains('dark')
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })

  return {
    isDark,
  }
}
