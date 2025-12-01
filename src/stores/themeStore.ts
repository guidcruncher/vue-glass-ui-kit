import { defineStore } from 'pinia'

const THEME_STORAGE_KEY = 'app-theme'
const AVAILABLE_THEMES = ['light', 'dark']

function detectOSPreference(): 'light' | 'dark' {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }
  return 'light'
}

function applyThemeToDOM(theme: string) {
  if (document) {
    document.body.setAttribute('data-theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
    if (theme == 'dark') {
      document.documentElement.classList.add('dark')
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
      document.documentElement.classList.remove('dark')
    }
  }
}

export const useThemeStore = defineStore('theme', {
  state: () => {
    const persistedTheme = localStorage.getItem(THEME_STORAGE_KEY)

    let initialTheme: 'light' | 'dark'
    const hasExplicitChoice = !!persistedTheme

    if (hasExplicitChoice && AVAILABLE_THEMES.includes(persistedTheme!)) {
      initialTheme = persistedTheme as 'light' | 'dark'
    } else {
      initialTheme = detectOSPreference()
    }

    return {
      currentTheme: initialTheme,
      availableThemes: AVAILABLE_THEMES,

      hasExplicitChoice: hasExplicitChoice,
    }
  },

  actions: {
    setTheme(theme: string) {
      if (AVAILABLE_THEMES.includes(theme)) {
        this.currentTheme = theme as 'light' | 'dark'
        localStorage.setItem(THEME_STORAGE_KEY, theme)
        this.hasExplicitChoice = true
        applyThemeToDOM(theme)
      } else {
        console.error(`Attempted to set invalid theme: ${theme}`)
      }
    },

    restoreTheme() {
      applyThemeToDOM(this.currentTheme)

      if (!this.hasExplicitChoice) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

        const osChangeListener = (e: MediaQueryListEvent) => {
          if (!this.hasExplicitChoice) {
            const newTheme = e.matches ? 'dark' : 'light'
            this.currentTheme = newTheme
            applyThemeToDOM(newTheme)
          }
        }

        mediaQuery.addEventListener('change', osChangeListener)
      }
    },
  },
})
