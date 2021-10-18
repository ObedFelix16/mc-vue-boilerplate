<template>
  <main id="main">
    <slot>
      <Transition
        appear
        mode="out-in"
        @before-enter="viewBeforeEnter"
        @enter="viewEnter"
        @leave="viewLeave"
      >
        <RouterView />
      </Transition>
    </slot>
  </main>
</template>

<script lang="ts">
import { gsap } from 'gsap'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'LayoutCommon',

  setup() {
    function viewBeforeEnter(el: Element) {
      gsap.set(el, {
        opacity: 0,
      })
    }

    function viewEnter(el: Element, done: () => void) {
      gsap.to(el, {
        duration: 0.3,
        opacity: 1,
        ease: 'linear',
        onComplete: done,
      })
    }

    function viewLeave(el: Element, done: () => void) {
      gsap.to(el, {
        duration: 0.3,
        opacity: 0,
        ease: 'linear',
        onComplete: done,
      })
    }

    return {
      viewBeforeEnter,
      viewEnter,
      viewLeave,
    }
  },
})
</script>
