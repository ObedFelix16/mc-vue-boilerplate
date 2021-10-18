<template>
  <BaseBox :class="computedClass" v-on="$listeners">
    <BaseText>
      <BaseIcon :tone="tone" />
    </BaseText>
    <BaseBox class="flex-1">
      <slot />
    </BaseBox>
    <BaseBox>
      <BaseButton
        v-if="dismissable"
        :tone="tone"
        variant="transparent"
        @click="close"
      >
        <BaseIcon name="close-small" source="custom" />
      </BaseButton>
    </BaseBox>
  </BaseBox>
</template>

<script lang="ts">
import { Color, colors } from '@/design/system/helpers'
import { computed, defineComponent, PropType } from '@vue/composition-api'

export const alertToneConfig: Record<Color, string[]> = {
  primary: [
    'text-primary-700',
    'bg-primary-50',
    'border-primary-400',
    'ring-primary-100',
  ],
  secondary: [
    'text-secondary-700',
    'bg-secondary-50',
    'border-secondary-400',
    'ring-secondary-100',
  ],
  tertiary: [
    'text-tertiary-700',
    'bg-tertiary-50',
    'border-tertiary-400',
    'ring-tertiary-100',
  ],
  quaternary: [
    'text-quaternary-700',
    'bg-quaternary-50',
    'border-quaternary-400',
    'ring-quaternary-100',
  ],
  quinary: [
    'text-quinary-700',
    'bg-quinary-50',
    'border-quinary-400',
    'ring-quinary-100',
  ],
  critical: [
    'text-critical-700',
    'bg-critical-50',
    'border-critical-400',
    'ring-critical-100',
  ],
  caution: [
    'text-caution-700',
    'bg-caution-50',
    'border-caution-400',
    'ring-caution-100',
  ],
  positive: [
    'text-positive-700',
    'bg-positive-50',
    'border-positive-400',
    'ring-positive-100',
  ],
  neutral: [
    'text-neutral-700',
    'bg-neutral-50',
    'border-neutral-400',
    'ring-neutral-100',
  ],
  info: ['text-info-700', 'bg-info-50', 'border-info-400', 'ring-info-100'],
  promote: [
    'text-promote-700',
    'bg-promote-50',
    'border-promote-400',
    'ring-promote-100',
  ],
}

export const alertBaseClasses = [
  'flex',
  'flex-row',
  'space-x-2',
  'p-5',
  'rounded-md',
  'border-l-4',
  'ring-1',
]

export default defineComponent({
  name: 'BaseAlert',

  props: {
    tone: {
      type: String as PropType<Color>,
      default: 'neutral' as Color,
      validator: (value: Color) => colors.includes(value),
    },

    dismissable: {
      type: Boolean,
      default: false,
    },
  },

  emits: {
    close: null,
  },

  setup(props, context) {
    const computedClass = computed(() => [
      ...alertBaseClasses,
      ...alertToneConfig[props.tone],
    ])

    function close() {
      context.emit('close', false)
    }

    return {
      computedClass,
      close,
    }
  },
})
</script>
