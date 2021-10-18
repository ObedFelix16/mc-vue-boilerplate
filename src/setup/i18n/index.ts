import { api } from '@/services/client'
import {
  defaultLanguageLocale,
  getDefaultLanguage,
  messages,
  setLocalStorageLang,
} from '@/setup/i18n/helpers'
import { inBrowser } from '@/utils/dom'
import { esMx, setCurrentLanguage } from '@/utils/language'
import { setupCalendar } from 'v-calendar'
import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const defaultOrPreferredLanguage: string = getDefaultLanguage()

const i18n = new VueI18n({
  locale: defaultLanguageLocale, // set default locale
  fallbackLocale: defaultLanguageLocale,
  silentTranslationWarn: true,
  messages, // set initial locale global messages
})

setI18nApiHeaders(defaultLanguageLocale)
setHtmlLangAttribute(defaultLanguageLocale)

// the default language is preloaded
const loadedLanguages: string[] = [defaultLanguageLocale]

// If the default language is different from the user's preferred one,
// lazy load the preferred language.
if (defaultLanguageLocale !== defaultOrPreferredLanguage) {
  loadLanguageAsync(defaultOrPreferredLanguage)
}

function setI18nLanguage(lang: string): string {
  i18n.locale = lang
  setCurrentLanguage(lang)
  setLocalStorageLang(lang)
  setI18nApiHeaders(lang)
  setHtmlLangAttribute(lang)
  // v-calendar does not support 'es-MX' locale, use 'es' instead
  setupCalendar({ locale: lang === esMx.locale ? esMx.shortLocale : lang })
  return lang
}

function setI18nApiHeaders(lang: string) {
  api.base.defaults.headers.common['Accept-Language'] = lang
  api.security.defaults.headers.common['Accept-Language'] = lang
  api.contact.defaults.headers.common['Accept-Language'] = lang
}

function setHtmlLangAttribute(lang: string) {
  if (inBrowser) {
    const htmlEl = document.querySelector('html')
    if (htmlEl) {
      htmlEl.setAttribute('lang', lang)
    }
  }
}

export async function loadLanguageAsync(lang: string): Promise<string> {
  if (i18n.locale !== lang) {
    if (!loadedLanguages.includes(lang)) {
      const [localesModule, validationModule] = await Promise.all([
        import(/* webpackChunkName: "[request]" */ `@/locales/${lang}.json`),
        import(
          /* webpackChunkName: "[request]" */ `@/setup/vee-validate/locales/${lang}`
        ),
      ])
      i18n.setLocaleMessage(lang, {
        ...localesModule.default,
        validations: validationModule.default,
      })
      loadedLanguages.push(lang)
      return setI18nLanguage(lang)
    }
    return Promise.resolve(setI18nLanguage(lang))
  }
  return Promise.resolve(lang)
}

export default i18n
