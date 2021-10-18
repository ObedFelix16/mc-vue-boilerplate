<template>
  <div
    ref="scrollContainer"
    class="scroll-container"
    @wheel.prevent="handleScroll"
  >
    <div
      ref="scrollWrapper"
      :style="{ left: left + 'px' }"
      class="scroll-wrapper"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

const padding = 15 // tag's padding

export default Vue.extend({
  name: 'ScrollPane',

  data() {
    return {
      left: 0,
    }
  },

  methods: {
    handleScroll(e: WheelEvent) {
      const eventDelta = -e.deltaY * 3
      const $container = this.$refs.scrollContainer as HTMLElement
      const $containerWidth = $container.offsetWidth
      const $wrapper = this.$refs.scrollWrapper as HTMLElement
      const $wrapperWidth = $wrapper.offsetWidth
      if (eventDelta > 0) {
        this.left = Math.min(0, this.left + eventDelta)
      } else {
        if ($containerWidth - padding < $wrapperWidth) {
          const currentLeft = this.left
          if (this.left < -($wrapperWidth - $containerWidth + padding)) {
            this.left = currentLeft
          } else {
            this.left = Math.max(
              this.left + eventDelta,
              $containerWidth - $wrapperWidth - padding
            )
          }
        } else {
          this.left = 0
        }
      }
    },

    moveToTarget($target: HTMLElement) {
      const $container = this.$refs.scrollContainer as HTMLElement
      const $containerWidth = $container.offsetWidth
      const $targetLeft = $target.offsetLeft
      const $targetWidth = $target.offsetWidth
      if ($targetLeft < -this.left) {
        // tag in the left
        this.left = -$targetLeft + padding
      } else if (
        $targetLeft + padding > -this.left &&
        $targetLeft + $targetWidth < -this.left + $containerWidth - padding
      ) {
        // tag in the current view
        // eslint-disable-line
      } else {
        // tag in the right
        this.left = -($targetLeft - ($containerWidth - $targetWidth) + padding)
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;

  .scroll-wrapper {
    position: absolute;
  }
}
</style>
