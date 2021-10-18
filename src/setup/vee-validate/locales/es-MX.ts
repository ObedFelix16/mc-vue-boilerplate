import es from 'vee-validate/dist/locale/es.json'

export default {
  ...es.messages,
  required: 'El campo {_field_} es requerido',
  required_if: 'El campo {_field_} es requerido',
  min_length_array: `El campo {_field_} debe de contener por lo menos {length} valor(es).`,
  verify_password: `El campo {_field_} debe de contener por lo menos: 1 letra mayúscula, 1 letra minúscula, 1 número, y un caracter especial (ej. , . _ & ? etc).`,
} as Record<string, string>
