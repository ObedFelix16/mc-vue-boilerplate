<template>
  <BaseBox v-if="showComponent" :id="id" class="flex justify-end">
    <BaseBox class="flex-grow">
      <BaseText class="text-sm" :tone="computedTone">
        <div class="flex">
          <BaseBox class="pr-1 flex-shrink-0 flex-grow-0">
            <BaseIcon v-if="showIcon" :tone="tone" />
          </BaseBox>
          <template v-if="hasMessage">
            <slot :message="message" name="message">
              {{ message }}
            </slot>
          </template>
          <template v-else-if="reserveMessageSpace">&#160;</template>
        </div>
      </BaseText>
    </BaseBox>
    <BaseBox class="pl-3 flex-grow-0">
      <slot :secondary-message="secondaryMessage" name="secondary-message">
        {{ secondaryMessage }}
      </slot>
    </BaseBox>
  </BaseBox>
</template>

<script lang="ts">
import { Color, colors } from '@/design/system/helpers'
import { computed, defineComponent, PropType } from '@vue/composition-api'

export default defineComponent({
  name: 'BaseFieldMessage',

  props: {
    id: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      default: '',
    },

    secondaryMessage: {
      type: String,
      default: '',
    },

    tone: {
      type: String as PropType<Color>,
      default: 'neutral' as Color,
      validator: (value: Color) => colors.includes(value),
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    reserveMessageSpace: {
      type: Boolean,
      default: true,
    },
  },

  setup(props, context) {
    const isNeutralTone = computed(() => props.tone === 'neutral')

    const computedTone = computed(() =>
      isNeutralTone.value ? 'secondary' : props.tone
    )

    const hasMessage = computed(() =>
      Boolean(props.message || context.slots.message)
    )

    const hasSecondaryMessage = computed(() =>
      Boolean(
        props.secondaryMessage ||
          context.slots.secondaryMessage ||
          context.slots['secondary-message']
      )
    )

    const showMessage = computed(() =>
      Boolean(!props.disabled && hasMessage.value)
    )

    const showSecondaryMessage = computed(() =>
      Boolean(!props.disabled && hasSecondaryMessage.value)
    )

    const showComponent = computed(
      () =>
        hasMessage.value ||
        hasSecondaryMessage.value ||
        props.reserveMessageSpace
    )

    const showIcon = computed(() =>
      Boolean(showMessage.value && !isNeutralTone.value)
    )

    return {
      computedTone,
      showIcon,
      hasMessage,
      showMessage,
      showSecondaryMessage,
      showComponent,
    }
  },
})
</script>
