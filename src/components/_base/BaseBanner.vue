<template>
  <BaseBox class="relative">
    <BaseBox class="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
      <BaseBox class="pr-16 sm:text-center sm:px-16">
        <slot />
      </BaseBox>
      <BaseBox
        class="
          absolute
          inset-y-0
          right-0
          pt-1
          pr-1
          flex
          items-start
          sm:pt-1 sm:pr-2 sm:items-start
        "
      >
        <BaseButton variant="transparent" tone="neutral">
          <BaseText class="sr-only">Dismiss</BaseText>
          <BaseIcon name="times" />
        </BaseButton>
      </BaseBox>
    </BaseBox>
  </BaseBox>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'BaseBanner',

  props: {
    tag: {
      type: String,
      default: 'div',
    },
  },

  emits: {
    close: null,
  },

  setup(props, context) {
    function close() {
      context.emit('close')
    }

    return {
      close,
    }
  },
})
</script>
