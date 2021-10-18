import i18n from '@/setup/i18n'
import { configure } from 'vee-validate'
import { addRules } from './helpers'
import rules from './rules'

addRules(rules)

configure({
  // this will be used to generate messages.
  // https://logaretm.github.io/vee-validate/guide/localization.html#using-other-i18n-libraries
  defaultMessage: (_, values) =>
    values && values._rule_
      ? (i18n.t(`validations.${values._rule_}`, values) as string)
      : '',
})
