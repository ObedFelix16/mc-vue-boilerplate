<template>
  <BaseBox
    class="
      PwaNewContent
      z-50
      fixed
      bottom-3
      right-3
      p-5
      gap-6
      bg-gray-900
      text-gray-200
      dark:bg-gray-800 dark:text-gray-200
      shadow-lg
      rounded-xl
      max-w-xs
    "
  >
    <BaseText class="text-lg">
      <i18n :tag="false" path="pwa.newContent.message">
        <template #appTitle>
          {{ appTitle }}
        </template>
      </i18n>
    </BaseText>
    <BaseButton tone="tertiary" @click="loadNewContent">
      <i18n :tag="false" path="pwa.newContent.callToAction" />
    </BaseButton>
    <BaseIcon
      name="times"
      class="absolute top-3 right-3 cursor-pointer hover:opacity-50"
      @click="close"
    />
  </BaseBox>
</template>

<i18n lang="json">
{
  "en-US": {
    "pwa": {
      "newContent": {
        "message": "A new version of {appTitle} is available.",
        "callToAction": "Update"
      }
    }
  },
  "es-MX": {
    "pwa": {
      "newContent": {
        "message": "Una nueva versión de {appTitle} está disponible.",
        "callToAction": "Actualizar"
      }
    }
  }
}
</i18n>

<script lang="ts">
import appConfig from '@/app.config.json'
import Vue from 'vue'

export default Vue.extend({
  name: 'PwaNewContent',

  data() {
    return {
      appTitle: appConfig.title,
    }
  },

  computed: {
    rootEl(): HTMLElement {
      return this.$root.$el as HTMLElement
    },
  },

  methods: {
    changeNewContentStatus(): void {
      this.rootEl.dataset.newContent = 'false'
    },

    loadNewContent(): void {
      this.changeNewContentStatus()
      window.location.reload()
    },

    close(): void {
      this.changeNewContentStatus()
    },
  },
})
</script>

<style lang="scss" scoped>
.PwaNewContent {
  display: none;
}

[data-new-content='true'] .PwaNewContent {
  display: grid;
}
</style>
