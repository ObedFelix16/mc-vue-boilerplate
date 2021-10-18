export const displayRules = ['block', 'flex', 'grid', 'none'] as const
export type Display = typeof displayRules[number]

export const flexWrapRules = ['nowrap', 'wrap', 'wrap-reverse'] as const
export type FlexWrap = typeof flexWrapRules[number]

export const flexDirectionRules = [
  'column',
  'column-reverse',
  'row',
  'row-reverse',
] as const
export type FlexDirection = typeof flexDirectionRules[number]

export const flexGrowRules = [0, 1] as const
export type FlexGrow = typeof flexGrowRules[number]

export const flexShrinkRules = [0] as const
export type FlexShrink = typeof flexShrinkRules[number]

export const gridAutoFlowRules = [
  'row',
  'column',
  'dense',
  'row dense',
  'column dense',
] as const
export type GridAutoFlow = typeof gridAutoFlowRules[number]

export const justifyContentRules = [
  'start',
  'center',
  'end',
  'space-between',
  'space-around',
] as const
export type JustifyContent = typeof justifyContentRules[number]

export const alignItemsRules = ['start', 'center', 'end'] as const
export type AlignItems = typeof alignItemsRules[number]

export const textAlignRules = ['left', 'center', 'right', 'justify'] as const
export type TextAlign = typeof textAlignRules[number]
