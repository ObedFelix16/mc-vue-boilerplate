<template>
  <div class="PwaOnlineStatus">
    <p class="PwaOnlineStatus__message">
      {{ $t('pwa.onlineStatus.message', { appTitle }) }}
    </p>
    <BaseButton @click="reload">
      {{ $t('pwa.onlineStatus.callToAction') }}
    </BaseButton>
  </div>
</template>

<i18n lang="json">
{
  "en-US": {
    "pwa": {
      "onlineStatus": {
        "message": "No internet connection",
        "callToAction": "Reload"
      }
    }
  },
  "es-MX": {
    "pwa": {
      "onlineStatus": {
        "message": "Sin conexión a internet",
        "callToAction": "Volver a cargar"
      }
    }
  }
}
</i18n>

<script lang="ts">
import appConfig from '@/app.config.json'
import Vue from 'vue'

export default Vue.extend({
  name: 'PwaOnlineStatus',

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

  created() {
    // this.updateOnlineStatus()
    document.addEventListener('online', this.updateOnlineStatus)
    document.addEventListener('offline', this.updateOnlineStatus)
  },

  beforeDestroy() {
    document.removeEventListener('online', this.updateOnlineStatus)
    document.removeEventListener('offline', this.updateOnlineStatus)
  },

  methods: {
    updateOnlineStatus() {
      this.rootEl.dataset.internetStatus = navigator.onLine
        ? 'online'
        : 'offline'
    },

    reload(): void {
      window.location.reload()
    },
  },
})
</script>

<style lang="scss" scoped>
.PwaOnlineStatus {
  display: none;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  grid-gap: 10px;
  padding: 0.5em;
  z-index: 1060;
  background-color: var(--theme-color-danger-light);
  color: var(--theme-color-danger-dark);
  box-shadow: var(--shadow-standard);
  border: 1px solid rgba(0, 0, 0, 0.1);
  width: 100%;
  font-size: 0.8em;

  &__message {
    padding: 0 0.5em;
  }
}

[data-internet-status='offline'] .PwaOnlineStatus {
  display: flex;
}
</style>
