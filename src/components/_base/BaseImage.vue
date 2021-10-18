<template>
  <img
    :src="attributes.src || undefined"
    :srcset="srcset || attributes.srcset"
    :sizes="sizes || attributes.sizes || undefined"
    :alt="alt"
    :width="width || attributes.width || undefined"
    :height="height || attributes.height || undefined"
    v-on="$listeners"
  />
</template>

<script lang="ts">
import { Breakpoint } from '@/design/system/helpers'
import {
  computed,
  defineComponent,
  PropType,
  inject,
} from '@vue/composition-api'
import {
  DEFAULT_BREAKPOINT,
  WidthProviderSymbol,
  widthRatioBreakpoints,
} from './BaseBox.vue'

export const imageBreakpointPrefix: Record<string, string> = {
  xs: 'XS',
  sm: 'S',
  md: 'M',
  lg: 'L',
  xl: 'XL',
  '2xl': 'XXL',
  '3xl': 'XXXL',
}

export default defineComponent({
  props: {
    width: {
      type: Number as PropType<number | null>,
      default: null,
    },

    height: {
      type: Number as PropType<number | null>,
      default: null,
    },

    src: {
      type: String,
      required: true,
    },

    size: {
      type: String as PropType<Breakpoint | null>,
      default: null,
    },

    srcset: {
      type: String,
      default: null,
    },

    sizes: {
      type: String,
      default: null,
    },

    /**
     * The alt tag is required for accessibility and SEO purposes.
     *
     * If it is a decorative image, which is purely there for design reasons,
     * consider moving it to CSS or using an empty alt tag.
     */
    alt: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    // If the URL starts with @, it's interpreted as a module request.
    // Vue CLI by default aliases @ to <projectRoot>/src. (templates only)
    const isModuleRequest = computed(() => props.src.startsWith('@/'))

    // If it is a module request,
    // the exact module is not known on compile time,
    // so an expression is used in the request to create a context.
    const computedSrc = isModuleRequest.value
      ? require(`@/assets/images/${props.src.replace(`@/assets/images/`, '')}`)
      : props.size
      ? getBreakpointImageSrc(props.src, props.size)
      : props.src

    const breakpointWidths = inject(WidthProviderSymbol, null)

    const attributes = computed(() => {
      const attributes: Record<string, string | null> = {
        src: computedSrc,
        srcset: null,
        sizes: null,
        width: null,
        height: null,
      }

      if (breakpointWidths) {
        const srcset: string[] = []
        const sizes: string[] = []

        Object.keys(breakpointWidths.value).forEach((breakpoint) => {
          const width = breakpointWidths.value[breakpoint]

          let src = getBreakpointImageSrc(props.src, breakpoint)

          if (breakpoint === DEFAULT_BREAKPOINT) {
            attributes.src = src
          }

          srcset.push(`${src} ${width}w`)
          sizes.push(
            `${
              widthRatioBreakpoints[breakpoint]
                ? `(min-width: ${widthRatioBreakpoints[breakpoint]}px) `
                : ''
            }${width}px`
          )
        })

        attributes.srcset = srcset.join(', ')
        attributes.sizes = [...sizes].reverse().join(', ')
      }

      return attributes
    })

    function getBreakpointImageSrc(src: string, breakpoint: string) {
      const imagePath = src.substr(0, src.lastIndexOf('/') + 1)
      const imageName = src.split('/').pop()
      return `${imagePath}${imageBreakpointPrefix[breakpoint]}_${imageName}`
    }

    return {
      attributes,
    }
  },
})
</script>
