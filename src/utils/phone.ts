import { countries } from '@/utils/country'

const phoneCodesRegExp = Object.values(countries)
  .map((c) => c.phoneCode)
  .join('|')

export function formatPhoneNumber(value: string | number): string {
  const cleaned = value.toString().replace(/\D/g, '')
  const match = cleaned.match(
    new RegExp(`^(${phoneCodesRegExp})?(\\d{3})(\\d{3})(\\d{4})$`)
  )
  if (match) {
    const intlCode = match[1] ? `+${match[1]} ` : ''
    return [intlCode, '(', match[2], ') ', match[3], ' ', match[4]].join('')
  }
  return cleaned
}

export function unformatPhoneNumber(value: string): string {
  return value.replace(/\D/g, '')
}
