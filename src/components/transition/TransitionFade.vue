<script lang="ts">
import { gsap } from 'gsap'
import Vue, { VNode } from 'vue'

export default Vue.extend({
  name: 'TransitionFade',

  functional: true,

  props: {
    duration: {
      type: Number,
      default: 0.25,
    },

    initialOpacity: {
      type: Number,
      default: 0,
    },

    targetOpacity: {
      type: Number,
      default: 1,
    },
  },

  render(createElement, context): VNode {
    context.data.on = {
      ...context.data.on,
      beforeEnter(el: HTMLElement): void {
        gsap.set(el, {
          opacity: context.props.initialOpacity,
        })
      },

      enter(el: HTMLElement, done: () => void): void {
        gsap.to(el, {
          duration: context.props.duration,
          opacity: context.props.targetOpacity,
          ease: 'expo.out',
          clearProps: 'opacity',
          onComplete: done,
        })
      },

      leave(el: HTMLElement, done: () => void): void {
        gsap.to(el, {
          duration: context.props.duration,
          opacity: context.props.initialOpacity,
          ease: 'expo.out',
          onComplete: done,
        })
      },
    }

    return createElement('transition', context.data, context.children)
  },
})
</script>
