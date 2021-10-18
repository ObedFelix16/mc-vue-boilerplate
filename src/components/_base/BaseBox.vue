<template>
  <Component :is="tag">
    <slot />
  </Component>
</template>

<script lang="ts">
import { breakpointsRecords } from '@/design/system/helpers'
import {
  computed,
  ComputedRef,
  defineComponent,
  inject,
  InjectionKey,
  PropType,
  provide,
} from '@vue/composition-api'

const { xs, sm, md, lg, xl } = breakpointsRecords

export const widthRatioBreakpoints: Record<string, number> = {
  xs,
  sm,
  md,
  lg,
  xl,
  '2xl': breakpointsRecords['2xl'],
  '3xl': breakpointsRecords['3xl'],
}

export const DEFAULT_BREAKPOINT = 'sm'

export const WidthProviderSymbol: InjectionKey<
  ComputedRef<Record<string, number>>
> = Symbol('Width provider identifier')

function useBreakpointWidthsRatios(
  responsiveWidthOrWidths:
    | string
    | string[]
    | number
    | number[]
    | (string | number)[]
) {
  return computed(() => {
    const breakpointWidthsRatios: Record<string, string> = {}
    const responsiveWidths = Array.isArray(responsiveWidthOrWidths)
      ? responsiveWidthOrWidths
      : [responsiveWidthOrWidths]

    for (const responsiveWidth of responsiveWidths) {
      const [breakpoint, width] = responsiveWidth.toString().split(':')
      const hasBreakpointAndWidth = breakpoint && width
      breakpointWidthsRatios[
        hasBreakpointAndWidth ? breakpoint : DEFAULT_BREAKPOINT
      ] = hasBreakpointAndWidth ? width : breakpoint
    }

    return breakpointWidthsRatios
  })
}

function useBreakpointWidths({
  breakpointWidthsRatios,
  parentBreakpointWidths,
}: {
  breakpointWidthsRatios: ComputedRef<Record<string, string>>
  parentBreakpointWidths: ComputedRef<Record<string, number>>
}) {
  return computed(() => {
    const breakpointWidths: Record<string, number> = {}

    let width = '12/12'
    for (const breakpoint of Object.keys(widthRatioBreakpoints)) {
      // If there is no width for a certain breakpoint we assume full
      // width or the same width as at the previous breakpoint.
      width = breakpointWidthsRatios.value[breakpoint] || width

      // Is number
      if (/^-?\d+$/.test(width)) {
        breakpointWidths[breakpoint] = Number.parseInt(width, 10)
        continue
      }

      const [columns, maxColumns] = width
        .split('/')
        .map((x) => Number.parseInt(x, 10))
      const factor = columns / maxColumns

      if (!parentBreakpointWidths.value[breakpoint]) continue

      breakpointWidths[breakpoint] = Math.round(
        parentBreakpointWidths.value[breakpoint] * factor
      )
    }

    return breakpointWidths
  })
}

export default defineComponent({
  name: 'BaseBox',

  props: {
    tag: {
      type: String,
      default: 'div',
    },

    widthRatio: {
      type: [Array, Number, String] as PropType<
        string | string[] | number | number[] | (string | number)[] | null
      >,
      default: null,
    },
  },

  setup(props) {
    if (props.widthRatio) {
      const parentBreakpointWidths = inject(
        WidthProviderSymbol,
        computed<Record<string, number>>(() => ({
          [DEFAULT_BREAKPOINT]: sm - 1,
        }))
      )
      const breakpointWidthsRatios = useBreakpointWidthsRatios(props.widthRatio)
      const breakpointWidths = useBreakpointWidths({
        breakpointWidthsRatios,
        parentBreakpointWidths,
      })

      provide(WidthProviderSymbol, breakpointWidths)
    }

    return {}
  },
})
</script>
