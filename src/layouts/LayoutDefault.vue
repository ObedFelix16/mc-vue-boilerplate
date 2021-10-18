<template>
  <div class="flex flex-col min-h-screen">
    <SiteHeader :items="navItems" />
    <main id="main" class="flex-1">
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
    <SiteFooter :site-map-items="navItems" class="print:hidden" />
  </div>
</template>

<script lang="ts">
import { useSiteHeader } from '@/composition/siteHeader'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import { gsap } from 'gsap'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'LayoutDefault',

  components: {
    SiteHeader,
    SiteFooter,
  },

  setup() {
    const { items: navItems } = useSiteHeader({
      items: [],
    })

    function viewBeforeEnter(el: Element) {
      gsap.set(el, {
        opacity: 0,
      })
    }

    function viewEnter(el: Element, done: () => void) {
      gsap.to(el, {
        duration: 0.15,
        opacity: 1,
        ease: 'linear',
        onComplete: done,
      })
    }

    function viewLeave(el: Element, done: () => void) {
      gsap.to(el, {
        duration: 0.15,
        opacity: 0,
        ease: 'linear',
        onComplete: done,
      })
    }

    return {
      navItems,
      viewBeforeEnter,
      viewEnter,
      viewLeave,
    }
  },
})
</script>
