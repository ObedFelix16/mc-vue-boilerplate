<template>
  <button
    :type="type"
    :class="computedClass"
    v-bind="computedAttributes"
    v-on="$listeners"
  >
    <span :class="loading ? 'invisible' : undefined">
      <slot />
    </span>
    <slot v-if="loading" name="loading">
      <span
        class="
          absolute
          inset-0
          w-full
          h-full
          flex
          place-items-center
          overflow-hidden
          px-4
        "
      >
        <span class="flex space-4 w-full justify-center">
          <svg
            class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span class="inline-block truncate">
            <slot name="loading-text" />
          </span>
        </span>
      </span>
    </slot>
  </button>
</template>

<script lang="ts">
import { Color, colors } from '@/design/system/helpers'
import { computed, defineComponent, PropType } from '@vue/composition-api'

type ButtonType = 'button' | 'reset' | 'submit'
export type ButtonVariant = 'solid' | 'ghost' | 'soft' | 'transparent'

export const buttonToneConfig: Record<
  Color,
  Record<ButtonVariant, (string | Record<string, boolean>)[]>
> = {
  primary: {
    solid: [
      'text-primary-inverse',
      'bg-primary',
      'hover:text-primary-500',
      'hover:bg-primary-50',
    ],
    ghost: [],
    soft: [
      'text-primary-700',
      'bg-primary-50',
      'hover:bg-primary-100',
      'dark:hover:border-primary-700',
      'dark:hover:bg-primary-700',
      'dark:text-primary-100',
      'dark:hover:bg-opacity-40',
    ],
    transparent: ['text-primary', 'hover:bg-primary-100'],
  },
  secondary: {
    solid: [
      'text-secondary-inverse',
      'bg-secondary',
      'hover:text-secondary-500',
      'hover:bg-secondary-50',
    ],
    ghost: [],
    soft: [
      'text-secondary-700',
      'bg-secondary-50',
      'hover:bg-secondary-100',
      'dark:hover:bg-secondary-700',
      'dark:text-secondary-100',
      'dark:hover:bg-secondary-40',
    ],
    transparent: ['text-secondary', 'hover:bg-secondary-100'],
  },
  tertiary: {
    solid: [
      'text-tertiary-inverse',
      'bg-tertiary',
      'hover:text-tertiary-500',
      'hover:bg-tertiary-50',
    ],
    ghost: [],
    soft: [
      'text-tertiary-700',
      'bg-tertiary-50',
      'hover:bg-tertiary-100',
      'dark:hover:bg-tertiary-700',
      'dark:text-tertiary-100',
      'dark:hover:bg-opacity-40',
    ],
    transparent: ['text-tertiary', 'hover:bg-tertiary-100'],
  },
  quaternary: {
    solid: [
      'text-quaternary-inverse',
      'bg-quaternary',
      'hover:text-quaternary-500',
      'hover:bg-quaternary-50',
    ],
    ghost: [],
    soft: [
      'text-quaternary-700',
      'bg-quaternary-50',
      'hover:bg-quaternary-100',
      'dark:hover:bg-quaternary-700',
      'dark:text-quaternary-100',
      'dark:hover:bg-opacity-40',
    ],
    transparent: ['text-quaternary', 'hover:bg-quaternary-100'],
  },
  quinary: {
    solid: [
      'text-quinary-inverse',
      'bg-quinary',
      'hover:text-quinary-500',
      'hover:bg-quinary-50',
    ],
    ghost: [],
    soft: [
      'text-quinary-700',
      'bg-quinary-50',
      'hover:bg-quinary-100',
      'dark:hover:bg-quinary-700',
      'dark:text-quinary-100',
      'dark:hover:bg-opacity-40',
    ],
    transparent: ['text-quinary', 'hover:bg-quinary-100'],
  },
  critical: {
    solid: [
      'text-critical-inverse',
      'bg-critical',
      'hover:text-critical-500',
      'hover:bg-critical-50',
    ],
    ghost: [],
    soft: [
      'text-critical-700',
      'bg-critical-50',
      'hover:bg-critical-100',
      'dark:hover:bg-critical-700',
      'dark:text-critical-100',
      'dark:hover:bg-opacity-40',
    ],
    transparent: ['text-critical', 'hover:bg-critical-100'],
  },
  caution: {
    solid: [
      'text-caution-inverse',
      'bg-caution',
      'hover:text-caution-500',
      'hover:bg-caution-50',
    ],
    ghost: [],
    soft: [
      'text-caution-700',
      'bg-caution-50',
      'hover:bg-caution-100',
      'dark:hover:bg-caution-700',
      'dark:text-caution-100',
      'dark:hover:bg-opacity-40',
    ],
    transparent: ['text-caution', 'hover:bg-caution-100'],
  },
  positive: {
    solid: [
      'text-positive-inverse',
      'bg-positive',
      'hover:text-positive-500',
      'hover:bg-positive-50',
    ],
    ghost: [],
    soft: [
      'text-positive-700',
      'bg-positive-50',
      'hover:bg-positive-100',
      'dark:hover:bg-positive-700',
      'dark:text-positive-100',
      'dark:hover:bg-opacity-40',
    ],
    transparent: ['text-positive', 'hover:bg-positive-100'],
  },
  neutral: {
    solid: [
      'text-neutral-inverse',
      'bg-neutral',
      'hover:text-neutral-500',
      'hover:bg-neutral-50',
    ],
    ghost: [],
    soft: [
      'text-neutral-700',
      'bg-neutral-100',
      'hover:bg-neutral-200',
      'dark:hover:bg-neutral-700',
      'dark:text-neutral-200',
      'dark:hover:bg-opacity-40',
    ],
    transparent: ['text-neutral', 'hover:bg-neutral-100'],
  },
  info: {
    solid: [
      'text-info-inverse',
      'bg-info',
      'hover:text-info-500',
      'hover:bg-info-50',
    ],
    ghost: [],
    soft: [
      'text-info-700',
      'bg-info-50',
      'hover:bg-info-100',
      'dark:hover:bg-info-700',
      'dark:text-info-100',
      'dark:hover:bg-opacity-40',
    ],
    transparent: ['text-info', 'hover:bg-info-100'],
  },
  promote: {
    solid: [
      'text-promote-inverse',
      'bg-promote',
      'hover:text-promote-500',
      'hover:bg-promote-50',
    ],
    ghost: [],
    soft: [
      'text-promote-700',
      'bg-promote-50',
      'hover:bg-promote-100',
      'dark:hover:bg-promote-700',
      'dark:text-promote-100',
      'dark:hover:bg-opacity-40',
    ],
    transparent: ['text-promote', 'hover:bg-promote-100'],
  },
}

export const buttonBaseClasses = [
  'w-full',
  'sm:w-auto',
  'font-normal',
  'leading-6',
  'text-lg',
  'text-center',
  'py-3',
  'px-4',
  'rounded-md',
  'transition-colors',
  'duration-200',
  'focus:outline-none',
  'focus-visible:ring-2',
  'dark:bg-opacity-90',
]

export const buttonVariantConfig: Record<ButtonVariant, string[]> = {
  solid: ['border-2', 'border-transparent', 'hover:border-current'],
  ghost: [],
  soft: [],
  transparent: ['border-2', 'border-transparent'],
}

export default defineComponent({
  name: 'BaseButton',

  props: {
    type: {
      type: String as PropType<ButtonType>,
      default: 'button',
      validator: (value: string) =>
        ['button', 'reset', 'submit'].includes(value),
    },

    tone: {
      type: String as PropType<Color>,
      default: 'neutral' as Color,
      validator: (value: Color) => colors.includes(value),
    },

    variant: {
      type: String as PropType<ButtonVariant>,
      default: 'solid' as ButtonVariant,
      validator: (value: string) =>
        ['solid', 'ghost', 'soft', 'transparent'].includes(value),
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    loading: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const computedClass = computed(() => [
      ...buttonBaseClasses,
      ...buttonToneConfig[props.tone][props.variant],
      ...buttonVariantConfig[props.variant],
      ...(props.disabled ? ['opacity-50'] : []),
      ...(props.loading ? ['relative pointer-events-none select-none'] : []),
    ])

    const computedAttributes = computed(() => ({
      disabled: props.disabled || props.loading,
    }))

    return {
      computedClass,
      computedAttributes,
    }
  },
})
</script>
