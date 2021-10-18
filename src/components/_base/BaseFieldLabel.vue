<template>
  <div>
    <BaseBox tag="span" class="flex justify-between">
      <label :for="htmlFor">
        <BaseText class="text-gray-700">
          <BaseStrong>
            <slot :label="label" name="label">
              {{ label }}
            </slot>
          </BaseStrong>
          <BaseText v-if="hasSecondaryLabel" class="text-sm text-gray-600">
            &nbsp;(<slot
              :secondary-label="secondaryLabel"
              name="secondary-label"
              >{{ secondaryLabel }}</slot
            >)
          </BaseText>
        </BaseText>
      </label>
      <BaseSecondary v-if="hasTertiaryLabel">
        &nbsp;<slot :tertiary-label="tertiaryLabel" name="tertiary-label">{{
          tertiaryLabel
        }}</slot>
      </BaseSecondary>
    </BaseBox>
    <BaseBox v-if="hasDescription">
      <BaseText :id="descriptionId" class="text-sm text-gray-500">
        <slot :description="description" name="description">
          {{ description }}
        </slot>
      </BaseText>
    </BaseBox>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'BaseFieldLabel',

  props: {
    htmlFor: {
      type: String,
      required: true,
    },

    label: {
      type: String,
      default: '',
    },

    secondaryLabel: {
      type: String,
      default: '',
    },

    tertiaryLabel: {
      type: String,
      default: '',
    },

    description: {
      type: String,
      default: '',
    },

    descriptionId: {
      type: String,
      default: '',
    },
  },

  setup(props, context) {
    const hasSecondaryLabel = computed(() =>
      Boolean(
        props.secondaryLabel ||
          context.slots.secondaryLabel ||
          context.slots['secondary-label']
      )
    )
    const hasTertiaryLabel = computed(() =>
      Boolean(
        props.tertiaryLabel ||
          context.slots.tertiaryLabel ||
          context.slots['tertiary-label']
      )
    )
    const hasDescription = computed(() =>
      Boolean(props.description || context.slots.description)
    )

    return {
      hasSecondaryLabel,
      hasTertiaryLabel,
      hasDescription,
    }
  },
})
</script>
