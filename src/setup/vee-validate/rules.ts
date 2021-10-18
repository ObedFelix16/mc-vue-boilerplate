import {
  confirmed,
  email,
  max,
  min,
  required,
  min_value,
  between,
} from 'vee-validate/dist/rules'
import { ValidationRule } from 'vee-validate/dist/types/types'

export default {
  required,
  email,
  min,
  max,
  min_value,
  between,
  confirmed,
  min_length_array: {
    validate(value, { length }: Record<string, any>) {
      if (value === undefined || value === null) {
        return false
      }
      return value.length >= length
    },
    params: ['length'],
  },

  verify_password: {
    validate(value) {
      return new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
      ).test(value)
    },
  },
} as Record<string, ValidationRule>
