import en from 'vee-validate/dist/locale/en.json'

export default {
  ...en.messages,
  min_length_array: `The {_field_} field must contain at least {length} value(s).`,
  verify_password: `The {_field_} field must contain at least: 1 uppercase letter, 1 lowercase letter, 1 number, and one special character (e.g. , . _ & ? etc).`,
} as Record<string, string>
