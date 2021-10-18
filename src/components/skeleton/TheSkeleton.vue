<template>
  <svg
    :width="skeletonWidth"
    :height="skeletonHeight"
    :style="skeletonStyle"
    class="skeleton"
  >
    <rect
      :rx="skeletonBorderRadius"
      :ry="skeletonBorderRadius"
      width="100%"
      height="100%"
      x="0"
      y="0"
      class="skeleton__rect"
    />
  </svg>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'TheSkeleton',

  props: {
    width: {
      type: [String, Number],
      default: '100%',
    },

    widthUnit: {
      type: String,
      default: 'px',
    },

    height: {
      type: [String, Number],
      default: 100,
    },

    heightUnit: {
      type: String,
      default: 'px',
    },

    rounded: {
      type: Boolean,
      default: false,
    },

    borderRadius: {
      type: Number,
      default: 4,
    },

    color: {
      type: String,
      default: 'currentColor',
    },

    shadowed: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    skeletonWidth(): string {
      return typeof this.width === 'string'
        ? this.width
        : `${this.width}${this.widthUnit}`
    },

    skeletonHeight(): string {
      return typeof this.height === 'string'
        ? this.height
        : `${this.height}${this.heightUnit}`
    },

    skeletonBorderRadius(): number {
      return this.rounded ? this.borderRadius : 0
    },

    skeletonStyle(): Record<string, string> {
      return {
        color: this.color,
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.skeleton {
  animation: shine 2s var(--global-timing-function-base) infinite alternate;

  &__rect {
    fill: currentColor;
  }
}

@keyframes shine {
  from {
    opacity: 0.5;
  }
  to {
    opacity: 1;
  }
}
</style>
