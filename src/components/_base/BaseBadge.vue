<template>
  <BaseBox :tag="tag" :class="computedClass">
    <slot />
  </BaseBox>
</template>

<script lang="ts">
import { Color, colors } from '@/design/system/helpers'
import { computed, defineComponent, PropType } from '@vue/composition-api'

type BadgeVariant = 'solid' | 'ghost' | 'soft' | 'transparent'

const badgeToneConfig: Record<
  Color,
  Record<BadgeVariant, (string | Record<string, boolean>)[]>
> = {
  primary: {
    solid: ['border-primary', 'bg-primary', 'text-primary-inverse'],
    ghost: ['border-primary', 'text-primary', 'dark:text-primary-200'],
    soft: [
      'border-primary-50',
      'bg-primary-50',
      'text-primary-700',
      'dark:border-primary-700',
      'dark:bg-primary-700',
      'dark:text-primary-100',
    ],
    transparent: [],
  },
  secondary: {
    solid: ['border-secondary', 'bg-secondary', 'text-secondary-inverse'],
    ghost: ['border-secondary', 'text-secondary', 'dark:text-secondary-200'],
    soft: [
      'border-secondary-50',
      'bg-secondary-50',
      'text-secondary-700',
      'dark:border-secondary-700',
      'dark:bg-secondary-700',
      'dark:text-secondary-100',
    ],
    transparent: [],
  },
  tertiary: {
    solid: ['border-tertiary', 'bg-tertiary', 'text-tertiary-inverse'],
    ghost: ['border-tertiary', 'text-tertiary', 'dark:text-tertiary-200'],
    soft: [
      'border-tertiary-50',
      'bg-tertiary-50',
      'text-tertiary-700',
      'dark:border-tertiary-700',
      'dark:bg-tertiary-700',
      'dark:text-tertiary-100',
    ],
    transparent: [],
  },
  quaternary: {
    solid: ['border-quaternary', 'bg-quaternary', 'text-quaternary-inverse'],
    ghost: ['border-quaternary', 'text-quaternary', 'dark:text-quaternary-200'],
    soft: [
      'border-quaternary-50',
      'bg-quaternary-50',
      'text-quaternary-700',
      'dark:border-quaternary-700',
      'dark:bg-quaternary-700',
      'dark:text-quaternary-100',
    ],
    transparent: [],
  },
  quinary: {
    solid: ['border-quinary', 'bg-quinary', 'text-quinary-inverse'],
    ghost: ['border-quinary', 'text-quinary', 'dark:text-quinary-200'],
    soft: [
      'border-quinary-50',
      'bg-quinary-50',
      'text-quinary-700',
      'dark:border-quinary-700',
      'dark:bg-quinary-700',
      'dark:text-quinary-100',
    ],
    transparent: [],
  },
  critical: {
    solid: ['border-critical', 'bg-critical', 'text-critical-inverse'],
    ghost: ['border-critical', 'text-critical', 'dark:text-critical-200'],
    soft: [
      'border-critical-50',
      'bg-critical-50',
      'text-critical-700',
      'dark:border-critical-700',
      'dark:bg-critical-700',
      'dark:text-critical-100',
    ],
    transparent: [],
  },
  caution: {
    solid: ['border-caution', 'bg-caution', 'text-caution-inverse'],
    ghost: ['border-caution', 'text-caution', 'dark:text-caution-200'],
    soft: [
      'border-caution-50',
      'bg-caution-50',
      'text-caution-700',
      'dark:border-caution-700',
      'dark:bg-caution-700',
      'dark:text-caution-100',
    ],
    transparent: [],
  },
  positive: {
    solid: ['border-positive', 'bg-positive', 'text-positive-inverse'],
    ghost: ['border-positive', 'text-positive', 'dark:text-positive-200'],
    soft: [
      'border-positive-50',
      'bg-positive-50',
      'text-positive-700',
      'dark:border-positive-700',
      'dark:bg-positive-700',
      'dark:text-positive-100',
    ],
    transparent: [],
  },
  neutral: {
    solid: ['border-neutral-200', 'bg-neutral-100', 'text-gray-800'],
    ghost: ['border-neutral', 'text-neutral', 'dark:text-neutral-200'],
    soft: [
      'border-neutral-50',
      'bg-neutral-50',
      'text-neutral-700',
      'dark:border-neutral-700',
      'dark:bg-neutral-700',
      'dark:text-neutral-100',
    ],
    transparent: [],
  },
  info: {
    solid: ['border-info', 'bg-info', 'text-info-inverse'],
    ghost: ['border-info', 'text-info', 'dark:text-info-200'],
    soft: [
      'border-info-50',
      'bg-info-50',
      'text-info-700',
      'dark:border-info-700',
      'dark:bg-info-700',
      'dark:text-info-100',
    ],
    transparent: [],
  },
  promote: {
    solid: ['border-promote', 'bg-promote', 'text-promote-inverse'],
    ghost: ['border-promote', 'text-promote', 'dark:text-promote-200'],
    soft: [
      'border-promote-50',
      'bg-promote-50',
      'text-promote-700',
      'dark:border-promote-700',
      'dark:bg-promote-700',
      'dark:text-promote-100',
    ],
    transparent: [],
  },
}

const badgeVariantConfig: Record<
  BadgeVariant,
  (string | Record<string, boolean>)[]
> = {
  solid: ['dark:border-opacity-70', 'dark:bg-opacity-70'],
  ghost: ['dark:border-opacity-70', 'dark:text-opacity-70'],
  soft: ['dark:border-opacity-40', 'dark:bg-opacity-40'],
  transparent: [],
}

export default defineComponent({
  name: 'BaseBadge',

  props: {
    tag: {
      type: String,
      default: 'span',
    },

    tone: {
      type: String as PropType<Color>,
      default: 'neutral' as Color,
      validator: (value: Color) => colors.includes(value),
    },

    variant: {
      type: String as PropType<BadgeVariant>,
      default: 'solid',
      validator: (value: string) =>
        ['solid', 'ghost', 'soft', 'transparent'].includes(value),
    },
  },

  setup(props) {
    const computedClass = computed(() => [
      'inline-block',
      'rounded-md',
      'px-2',
      'border',
      'truncate',
      'text-center',
      '',
      ...badgeToneConfig[props.tone][props.variant],
      ...badgeVariantConfig[props.variant],
    ])

    return {
      computedClass,
    }
  },
})
</script>
