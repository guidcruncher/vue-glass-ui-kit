import { onMounted, watch } from 'vue'
import { getTheme } from '../composables/getTheme'

export const BackgroundImage = {
  beforeMount(el, binding) {
    const { isDark } = getTheme()
    const backgroundUrl = isDark.value
      ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${binding.value}")`
      : `url(${binding.value})`

    el.style.backgroundImage = `url(${binding.value})`
    el.style.backgroundSize = 'cover'
    el.style.backgroundRepeat = 'no-repeat'
    el.style.backgroundAttachment = 'fixed'
  },
  unmounted(el) {},
}
