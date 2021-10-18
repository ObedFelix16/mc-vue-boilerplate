<template>
  <BaseBox :tag="tag" class="font-title">
    <slot />
  </BaseBox>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'BaseHeading',

  props: {
    level: {
      type: Number,
      required: true,
      validator: (value: number) => value > 0 && value < 7,
    },
  },

  setup(props) {
    const tag = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'][props.level - 1]

    return {
      tag,
    }
  },
})
</script>
