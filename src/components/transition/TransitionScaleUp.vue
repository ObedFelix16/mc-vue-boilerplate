<script lang="ts">
import { gsap } from 'gsap'
import Vue, { VNode } from 'vue'

export default Vue.extend({
  name: 'TransitionScaleUp',

  functional: true,

  props: {
    duration: {
      type: Number,
      default: 0.25,
    },

    initialScale: {
      type: Number,
      default: 0,
    },

    targetScale: {
      type: Number,
      default: 1,
    },
  },

  render(createElement, context): VNode {
    context.data.on = {
      ...context.data.on,
      beforeEnter(el: HTMLElement): void {
        gsap.set(el, {
          scale: context.props.initialScale,
        })
      },

      enter(el: HTMLElement, done: () => void): void {
        gsap.to(el, {
          duration: context.props.duration,
          scale: context.props.targetScale,
          clearProps: 'scale',
          ease: 'expo.out',
          onComplete: done,
        })
      },

      leave(el: HTMLElement, done: () => void): void {
        gsap.to(el, {
          duration: context.props.duration,
          scale: context.props.initialScale,
          ease: 'expo.out',
          onComplete: done,
        })
      },
    }

    return createElement('transition', context.data, context.children)
  },
})
</script>
