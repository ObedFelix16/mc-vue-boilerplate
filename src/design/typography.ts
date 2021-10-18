// ===
// Size
// ===
export const Sizes = [
  'none',
  'xxsmall',
  'xsmall',
  'small',
  'standard',
  'large',
  'xlarge',
  'xxlarge',
] as const

export type Size = typeof Sizes[number]

// ===
// Tone
// ===
export const BrandTones = ['brand', 'brand-accent', 'form-accent'] as const

export const BaseTones = [
  'neutral',
  'promote',
  'info',
  'caution',
  'positive',
  'critical',
] as const

export const BaseTonesLight = [
  'neutral-light',
  'promote-light',
  'info-light',
  'caution-light',
  'positive-light',
  'critical-light',
] as const

export const BaseTonesDark = [
  'neutral-dark',
  'promote-dark',
  'info-dark',
  'caution-dark',
  'positive-dark',
  'critical-dark',
] as const

export const Tones = [
  ...BrandTones,
  ...BaseTones,
  ...BaseTonesLight,
  ...BaseTonesDark,
] as const

export type Tone = typeof Tones[number]

// ===
// Weight
// ===
export const Weights = ['weak', 'regular', 'medium', 'strong'] as const

export type Weight = typeof Weights[number]
