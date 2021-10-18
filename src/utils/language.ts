import { ref } from '@vue/composition-api'

export interface Language {
  id: number
  guid: string
  locale: string
  shortLocale: string
  name: string
}

export const languages: Readonly<Record<string, Language>> = Object.freeze({
  enUs: {
    id: 2,
    guid: '477B13B2-E465-EB11-9FFE-00155E010303',
    locale: 'en-US',
    shortLocale: 'en',
    name: 'English',
  },
  esMx: {
    id: 1,
    guid: '467B13B2-E465-EB11-9FFE-00155E010303',
    locale: 'es-MX',
    shortLocale: 'es',
    name: 'Español',
  },
})

export const { enUs, esMx } = languages

export const defaultLanguage: Language = enUs

export const currentLanguage = ref(defaultLanguage)

export function setCurrentLanguage(locale: string) {
  currentLanguage.value =
    Object.values(languages).find((language) => language.locale === locale) ||
    defaultLanguage
}

export function getCurrentLanguage(locale: string): Language {
  return (
    Object.values(languages).find((language) => language.locale === locale) ||
    defaultLanguage
  )
}
