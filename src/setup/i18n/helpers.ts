import { defaultLanguage } from '@/utils/language'
import appStorage from '@/utils/appStorage'
import defaultMessages from '@/locales/en-US.json'
import defaultValidationMessages from '@/setup/vee-validate/locales/en-US'

export const langLocalStorageKey: string =
  appStorage.createNamespacedKey('lang')

export const defaultLanguageLocale: string = defaultLanguage.locale

export const getLocalStorageLang = (): string | null =>
  appStorage.getItem(langLocalStorageKey)

export const setLocalStorageLang = (lang: string): void =>
  appStorage.setItem(langLocalStorageKey, lang)

// Get preferred language from LocalStorage or HTTP request
export const getPreferredLanguage = (): string | null =>
  typeof window !== 'undefined' ? getLocalStorageLang() : ''

export const getDefaultLanguage = (): string => {
  return getPreferredLanguage() || defaultLanguageLocale
}

export const messages = {
  [defaultLanguage.locale]: {
    ...defaultMessages,
    validations: defaultValidationMessages,
  },
}
