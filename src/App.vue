<template>
  <BaseBox id="app" class="relative">
    <Transition
      :css="false"
      mode="out-in"
      @before-enter="layoutBeforeEnter"
      @enter="layoutEnter"
      @leave="layoutLeave"
    >
      <Component :is="layoutName" v-if="layoutName" />
    </Transition>
    <PortalTarget
      name="route-modal-container"
      :class="[
        'fixed inset-0 z-40 h-screen',
        { hidden: isModalContainerEmpty },
      ]"
      @change="onModalContainerChange"
    />
    <PortalTarget
      name="route-secondary-modal-container"
      :class="[
        'fixed inset-0 z-40 h-screen',
        { hidden: isSecondaryModalContainerEmpty },
      ]"
      @change="onSecondaryModalContainerChange"
    />
    <PortalTarget name="modal-container" />
    <CommuniqueContainer id="communique-container" class="z-50" />
    <PwaNewContent />
  </BaseBox>
</template>

<script lang="ts">
import PwaNewContent from '@/components/pwa/PwaNewContent.vue'
import { auth } from '@/composition/auth'
import { useScrollLock } from '@/composition/scrollLock'
import { currentRoute } from '@/router'
import i18n from '@/setup/i18n'
import { currentLanguage } from '@/utils/language'
import appConfig from '@/app.config.json'
import { CommuniqueContainer } from 'vue-communique'
import { gsap } from 'gsap'
import { computed, defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  name: 'App',

  metaInfo() {
    return {
      titleTemplate(title) {
        // All subcomponent titles will be injected into this template.
        return title ? `${i18n.t(title)} - ${appConfig.title}` : appConfig.title
      },

      meta: [
        {
          property: 'fb:app_id',
          content: appConfig.facebook.appId,
        },
        {
          property: 'og:site_name',
          content: appConfig.title,
        },
        {
          property: 'og:locale',
          content: currentLanguage.value.locale.replace('-', '_'),
        },
        {
          property: 'og:type',
          content: 'website',
        },
      ],
    }
  },

  components: {
    CommuniqueContainer,
    PwaNewContent,
  },

  setup() {
    const layoutName = computed(() => {
      let name = ''

      if (currentRoute.value) {
        if (currentRoute.value.meta && currentRoute.value.meta.layout) {
          name = currentRoute.value.meta.layout
        } else if (
          auth.loggedIn.value &&
          currentRoute.value?.matched.some((r) => r.meta.authRequired)
        ) {
          name = 'LayoutAdmin'
        } else {
          name = 'LayoutDefault'
        }
      }

      return name
    })

    const layoutBeforeEnter = (el: Element): void => {
      gsap.set(el, {
        opacity: 0.5,
      })
    }

    const layoutEnter = (el: Element, done: () => void): void => {
      gsap.to(el, {
        duration: 0.3,
        opacity: 1,
        ease: 'linear',
        clearProps: 'all',
        onComplete: done,
      })
    }

    const layoutLeave = (el: Element, done: () => void): void => {
      gsap.to(el, {
        duration: 0.3,
        opacity: 0,
        ease: 'linear',
        onComplete: done,
      })
    }

    const { enable: enableScrollLock, disable: disableScrollLock } =
      useScrollLock()

    const isModalContainerEmpty = ref(true)

    function onModalContainerChange(hasContent: boolean) {
      isModalContainerEmpty.value = !hasContent
      if (hasContent) {
        enableScrollLock()
      } else {
        disableScrollLock()
      }
    }

    const isSecondaryModalContainerEmpty = ref(true)

    function onSecondaryModalContainerChange(hasContent: boolean) {
      isSecondaryModalContainerEmpty.value = !hasContent
      if (hasContent) {
        enableScrollLock()
      } else {
        disableScrollLock()
      }
    }

    return {
      layoutName,
      layoutBeforeEnter,
      layoutEnter,
      layoutLeave,
      isModalContainerEmpty,
      onModalContainerChange,
      isSecondaryModalContainerEmpty,
      onSecondaryModalContainerChange,
    }
  },
})
</script>

<style lang="scss">
// Design variables and utilities from src/design.
@use '@/design/main';
@use '@/design/design';

// Style loading bar between pages.
// https://github.com/rstacruz/nprogress
@use '~nprogress/nprogress';

@include design.media-breakpoint-down(lg) {
  #communique-container {
    grid-template: initial;
    align-content: start;
  }
}

@include design.media-breakpoint-up(lg) {
  #communique-container {
    padding: 2rem;
  }
}

@media print {
  html {
    font-size: 12px;
  }

  body {
    color-adjust: exact;
  }

  #communique-container {
    display: none;
  }
}
</style>
