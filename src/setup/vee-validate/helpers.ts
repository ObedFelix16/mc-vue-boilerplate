import { extend, localize } from 'vee-validate'
import { ValidationRule } from 'vee-validate/dist/types/types'

export const addRules = (rules: Record<string, ValidationRule>) =>
  Object.entries(rules).forEach(([key, value]) => extend(key, value))

export async function loadLanguageRulesAsync(lang: string): Promise<void> {
  const module = await import(
    /* webpackChunkName: "[request]" */ `./locales/${lang}`
  )
  localize(lang, module.default)
}
