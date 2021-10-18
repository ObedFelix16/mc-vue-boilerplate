<template>
  <BaseBox :tag="tag" :class="computedClass">
    <slot />
  </BaseBox>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'BaseText',

  props: {
    tag: {
      type: String,
      default: 'span',
    },
  },

  setup() {
    const computedClass = computed(() => [])

    return {
      computedClass,
    }
  },
})
</script>
