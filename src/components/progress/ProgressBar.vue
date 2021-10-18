<template>
  <div class="ProgressBar">
    <slot :max="max">
      <ProgressBarChunk v-bind="$props" />
    </slot>
  </div>
</template>

<script lang="ts">
import { ThemeVariant } from '@/enums/ThemeVariant'
import Vue from 'vue'

export default Vue.extend({
  name: 'ProgressBar',

  components: {
    ProgressBarChunk: () =>
      import(
        /* webpackChunkName: 'ProgressBarChunk.vue' */ './ProgressBarChunk.vue'
      ),
  },

  props: {
    value: {
      type: Number,
      default: 0,
    },

    label: {
      type: String,
      default: null,
    },

    max: {
      type: Number,
      default: 100,
    },

    precision: {
      type: Number,
      default: 0,
    },

    variant: {
      type: String,
      default: ThemeVariant.Secondary as string,
    },

    showProgress: {
      type: Boolean,
      default: null,
    },

    showValue: {
      type: Boolean,
      default: null,
    },
  },
})
</script>

<style lang="scss" scoped>
.ProgressBar {
  display: flex;
  height: 1rem;
  overflow: hidden;
  background-color: #e9ecef;
  border-radius: 4px;
}
</style>
