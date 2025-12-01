import { onMounted, watch } from 'vue'
import { getTheme } from '../composables/getTheme'

export const BackgroundColor = {
  beforeMount(el, binding) {
    const { isDark } = getTheme()
    el.style.backgroundColor = `${binding.value}`
  },
  unmounted(el) {},
}
