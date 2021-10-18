<template>
  <div
    :aria-valuemin="0"
    :aria-valuemax="max"
    :aria-valuenow="preciseValue"
    :style="progressBarChunkStyles"
    class="ProgressBarChunk"
    role="progressbar"
  >
    <slot>
      <template v-if="label">
        {{ label }}
      </template>
      <template v-else-if="showProgress">
        {{ preciseProgress }}
      </template>
      <template v-else-if="showValue">
        {{ preciseValue }}
      </template>
    </slot>
  </div>
</template>

<script lang="ts">
import { ThemeVariant } from '@/enums/ThemeVariant'
import Vue from 'vue'

export default Vue.extend({
  name: 'ProgressBarChunk',

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

  computed: {
    progressBarChunkStyles(): Record<string, string> {
      return {
        width: 100 * (this.value / this.max) + '%',
        color: `var(--theme-color-${this.variant}-dark)`,
        backgroundColor: `var(--theme-color-${this.variant}-light)`,
      }
    },

    progress(): number {
      const p = Math.pow(10, this.precision)
      return Math.round((100 * p * this.value) / this.max) / p
    },

    preciseProgress(): string {
      return `${this.progress.toFixed(this.precision)}%`
    },

    preciseValue(): string {
      return this.value.toFixed(this.precision)
    },
  },
})
</script>

<style lang="scss" scoped>
.ProgressBarChunk {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 0.8em;
  overflow: hidden;
  transition: width var(--global-timing-function-base)
    var(--global-duration-animation-base);
}
</style>
