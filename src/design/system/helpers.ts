export const colors = [
  'primary',
  'secondary',
  'tertiary',
  'quaternary',
  'quinary',
  'critical',
  'caution',
  'positive',
  'neutral',
  'info',
  'promote',
] as const
export type Color = typeof colors[number]

export const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const
export type Breakpoint = typeof breakpoints[number]

export const breakpointsRecords: Record<Breakpoint, number> = {
  xs: 376,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  '3xl': 2048,
}

export const contentWidthSizes = ['xsmall', 'small', 'medium', 'large'] as const
export type ContentWidthSize = typeof contentWidthSizes[number]
