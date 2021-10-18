<template>
  <Transition
    :duration="duration"
    v-bind="$attrs"
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
    v-on="$listeners"
  >
    <slot />
  </Transition>
</template>

<script lang="ts">
import { gsap } from 'gsap'
import Vue from 'vue'

export default Vue.extend({
  name: 'TransitionView',

  inheritAttrs: false,

  props: {
    duration: {
      type: Number,
      default: 0.45,
    },
  },

  data() {
    return {
      y: -100,
    }
  },

  // watch: {
  //   $route(to, from) {
  //     const toDepth = to.path.split('/').length
  //     const fromDepth = from.path.split('/').length
  //     this.y = toDepth < fromDepth ? -100 : 100
  //   },
  // },

  methods: {
    beforeEnter(el: HTMLElement): void {
      gsap.set(el, {
        autoAlpha: 0,
        // y: this.y,
      })
    },

    enter(el: HTMLElement, done: () => void): void {
      gsap.to(el, {
        duration: this.duration,
        autoAlpha: 1,
        // y: 0,
        ease: 'power4.out',
        clearProps: 'all',
        onComplete: done,
      })
    },

    leave(el: HTMLElement, done: () => void): void {
      gsap.to(el, {
        duration: this.duration,
        autoAlpha: 0,
        // y: this.y * -1,
        ease: 'power4.out',
        onComplete: done,
      })
    },
  },
})
</script>
