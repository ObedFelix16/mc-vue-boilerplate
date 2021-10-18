<template>
  <BaseLink
    v-tippy="{ delay: [1000, 0] }"
    :content="title"
    tabindex="0"
    class="screenfull-trigger"
    @click="toggleFullScreen"
    @keydown.enter="toggleFullScreen"
  >
    <BaseIcon :name="icon" />
  </BaseLink>
</template>

<i18n lang="json">
{
  "en-US": {
    "screenfull": {
      "tooltip": {
        "enter": "Full screen",
        "exit": "Exit full screen"
      },
      "error": "Your browser does not support full screen."
    }
  },
  "es-MX": {
    "screenfull": {
      "tooltip": {
        "enter": "Pantalla completa",
        "exit": "Salir de pantalla completa"
      },
      "error": "Su navegador no soporta la pantalla completa."
    }
  }
}
</i18n>
<script lang="ts">
import screenfull from 'screenfull'
import { TranslateResult } from 'vue-i18n'
import Vue from 'vue'

export default Vue.extend({
  name: 'ScreenfullTrigger',

  data() {
    return {
      isFullscreen: false,
    }
  },

  computed: {
    title(): TranslateResult {
      return this.$t(
        `screenfull.tooltip.${this.isFullscreen ? 'exit' : 'enter'}`
      )
    },

    icon(): string {
      return this.isFullscreen ? 'compress-arrows-alt' : 'expand-arrows-alt'
    },
  },

  methods: {
    async toggleFullScreen() {
      if (!screenfull) return

      if (!screenfull.isEnabled) {
        this.$communique.dispatch({
          variant: 'error',
          message: this.$t('screenfull.error') as string,
        })
        return false
      }
      await screenfull.toggle()

      this.isFullscreen = screenfull.isFullscreen
    },
  },
})
</script>

<style lang="scss" scoped>
@use '@/design/design';

.screenfull-trigger {
  display: none;
  cursor: pointer;
  text-decoration: none;
  transition: color var(--global-duration-animation-base)
    var(--global-timing-function-base);

  &:not(.button) {
    color: inherit;
  }

  &:hover,
  &:focus {
    color: var(--theme-color-primary);
  }

  &:focus {
    outline: 0;
  }
}

@include design.media-breakpoint-up(md) {
  .screenfull-trigger {
    display: inline;
  }
}
</style>
