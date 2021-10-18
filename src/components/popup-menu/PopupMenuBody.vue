<template>
  <Transition
    :css="false"
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
  >
    <div v-if="open" :style="componentStyle" class="PopupMenuBody">
      <slot />
    </div>
  </Transition>
</template>

<script lang="ts">
import { gsap } from 'gsap'
import Vue from 'vue'

export enum PopupPosition {
  Top = 'top',
  TopLeft = 'top-left',
  TopRight = 'top-right',
  Right = 'right',
  Bottom = 'bottom',
  BottomLeft = 'bottom-left',
  BottomRight = 'bottom-right',
  Left = 'left',
}

export default Vue.extend({
  name: 'PopupMenuBody',

  model: {
    prop: 'open',
    event: 'update',
  },

  props: {
    open: {
      type: Boolean,
      default: false,
    },

    width: {
      type: [String, Number],
      default: 'auto',
    },

    position: {
      type: String,
      default: PopupPosition.BottomLeft,
    },
  },

  computed: {
    positionStyle(): Record<string, any> {
      let pos: Record<string, any> = {}

      switch (this.position) {
        case PopupPosition.Top:
          pos = {
            bottom: '100%',
          }
          break

        case PopupPosition.TopLeft:
          pos = {
            bottom: '100%',
            right: '0',
          }
          break

        case PopupPosition.TopRight:
          pos = {
            bottom: '100%',
            left: '0',
          }
          break

        case PopupPosition.Right:
          pos = {
            left: '100%',
          }
          break

        case PopupPosition.Bottom:
          pos = {
            top: '100%',
          }
          break

        case PopupPosition.BottomLeft:
          pos = {
            top: '100%',
            right: '0',
          }
          break

        case PopupPosition.BottomRight:
          pos = {
            top: '100%',
            left: '0',
          }
          break

        case PopupPosition.Left:
          pos = {
            right: '100%',
          }
          break

        default:
          pos = {}
          break
      }
      return pos
    },

    componentStyle(): Record<string, any> {
      return {
        width: typeof this.width === 'string' ? this.width : `${this.width}px`,
        ...this.positionStyle,
      }
    },
  },

  methods: {
    beforeEnter(el: HTMLElement): void {
      gsap.set(el, {
        opacity: 0,
        transformOrigin: '50% 0',
        translateY: -10,
      })
    },

    enter(el: HTMLElement, done: () => void): void {
      gsap.to(el, {
        duration: 0.3,
        opacity: 1,
        translateY: 0,
        ease: 'sine.out',
        onComplete: done,
      })
    },

    leave(el: HTMLElement, done: () => void): void {
      gsap.to(el, {
        duration: 0.2,
        opacity: 0,
        translateY: -10,
        ease: 'sine.out',
        onComplete: done,
      })
    },
  },
})
</script>

<style lang="scss" scoped>
.PopupMenuBody {
  position: absolute;
}
</style>
