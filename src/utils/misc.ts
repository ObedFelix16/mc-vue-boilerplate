export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function decapitalizeFirstLetter(str: string) {
  return str.charAt(0).toLowerCase() + str.slice(1)
}

export function normalizeResourceName(name: string) {
  return (
    name
      // Unicode Normalization Form
      // ie. The é of México ends up expressed as e + ´.
      .normalize('NFD')
      // Remove diacritics
      .replace(/[\u0300-\u036f]/g, '')
      // Remove spaces
      .replace(/\s+/g, '-')
      .toLowerCase()
  )
}

export function normalizePath(name: string) {
  return normalizeResourceName(
    name
      .replace(/([~!@#$%^&*()_+=`{}[\]|\\:;'<>,./? ])+/g, '-')
      .replace(/^(-)+|(-)+$/g, '')
  )
}

export function truncate(str: string, length: number) {
  return str.substr(0, length).trim()
}
