import appStorage from '@/utils/appStorage'
import { ref } from '@vue/composition-api'

export function useColorScheme() {
  const colorSchemeKey = appStorage.createNamespacedKey('color-scheme')
  const isInDarkMode = ref(appStorage.getItem(colorSchemeKey) === 'dark')

  if (isInDarkMode.value) {
    document.documentElement.classList.add('dark')
  }

  function toggleDarkMode() {
    if (isInDarkMode.value) {
      document.documentElement.classList.remove('dark')
      appStorage.setItem(colorSchemeKey, 'light')
    } else {
      document.documentElement.classList.add('dark')
      appStorage.setItem(colorSchemeKey, 'dark')
    }

    isInDarkMode.value = !isInDarkMode.value
  }

  return {
    isInDarkMode,
    toggleDarkMode,
  }
}
