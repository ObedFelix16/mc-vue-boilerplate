<template>
  <Component :is="tag" :class="computedClass" role="alert" aria-live="polite">
    <slot />
  </Component>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'

export default defineComponent({
  name: 'BaseNotice',

  props: {
    tag: {
      type: String,
      default: 'div',
    },

    tone: {
      type: String,
      default: 'neutral',
    },
  },

  setup(props) {
    const computedClass = computed(() => [
      'BaseNotice',
      `BaseNotice--tone-${props.tone}`,
    ])

    return {
      computedClass,
    }
  },
})
</script>

<style lang="scss" scoped>
.BaseNotice {
  display: inline-grid;
  align-items: center;
  grid-auto-flow: column;
  grid-gap: 8px;
}
</style>
