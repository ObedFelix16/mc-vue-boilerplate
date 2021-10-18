import i18n from '@/setup/i18n'
import { CommuniqueVariantConfig } from 'vue-communique'

export default {
  success: {
    title: i18n.t('success'),
    icon: 'check-circle',
    $attrs: {
      tone: 'positive',
    },
  },

  error: {
    title: i18n.t('error'),
    icon: 'times-circle',
    $attrs: {
      tone: 'critical',
    },
  },

  warning: {
    title: i18n.t('warning'),
    $attrs: {
      tone: 'warning',
    },
  },

  info: {
    title: i18n.t('info'),
    $attrs: {
      tone: 'info',
    },
  },
} as CommuniqueVariantConfig
