<template>
  <BaseBox tag="section">
    <BaseBox :class="['relative', { 'overflow-hidden': masked }]">
      <BaseBox class="absolute w-full h-full">
        <slot name="background" />
      </BaseBox>
      <slot name="container">
        <BaseBox :class="['relative', contained ? 'flex justify-center' : '']">
          <slot name="layout-container">
            <BaseBox
              :class="
                contained
                  ? [
                      'max-w-screen-lg',
                      'xl:max-w-screen-xl',
                      '2xl:max-w-screen-2xl',
                      '3xl:max-w-screen-3xl',
                      'w-full',
                    ]
                  : []
              "
            >
              <slot name="layout">
                <BaseBox class="py-14 lg:py-20">
                  <slot />
                </BaseBox>
              </slot>
            </BaseBox>
          </slot>
        </BaseBox>
      </slot>
    </BaseBox>
  </BaseBox>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'SiteSection',

  props: {
    masked: {
      type: Boolean,
      default: true,
    },

    contained: {
      type: Boolean,
      default: true,
    },
  },
})
</script>
