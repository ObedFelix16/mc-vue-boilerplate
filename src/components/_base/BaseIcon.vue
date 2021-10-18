<template>
  <FontAwesomeIcon
    v-if="source === 'font-awesome'"
    :icon="[prefix, computedName]"
    :class="computedClass"
  />
  <Component
    :is="customComponent"
    v-else-if="source === 'custom'"
    :class="computedClass"
  />
</template>

<script lang="ts">
import {
  faSync,
  faUser,
  faCaretDown,
  faTachometerAlt,
  faInfoCircle,
  faClock,
  faFire,
  faClipboardList,
  faExchangeAlt,
  faBars,
  faCube,
  faSignOutAlt,
  faFileSignature,
  faLandmark,
  faExclamationTriangle,
  faChevronCircleDown,
  faThumbsDown,
  faCubes,
  faMapMarkerAlt,
  faSearch,
  faSlidersH,
  faCalendarAlt,
  faTruck,
  faQrcode,
  faPaintBrush,
  faPallet,
  faLayerGroup,
  faFill,
  faWeight,
  faWeightHanging,
  faBell,
  faCheck,
  faTimes,
  faExclamationCircle,
  faBox,
  faBoxOpen,
  faLanguage,
  faToolbox,
  faTh,
  faThList,
  faSignInAlt,
  faLock,
  faKey,
  faPalette,
  faAngleLeft,
  faAngleRight,
  faAngleUp,
  faAngleDown,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleDoubleUp,
  faAngleDoubleDown,
  faCog,
  faCogs,
  faLink,
  faWarehouse,
  faTruckLoading,
  faBuilding,
  faFileInvoiceDollar,
  faUpload,
  faCloudUploadAlt,
  faFile,
  faShoppingCart,
  faFileInvoice,
  faDollarSign,
  faQuestionCircle,
  faThumbsUp,
  faPercentage,
  faPencilAlt,
  faSave,
  faCheckCircle,
  faTimesCircle,
  faFileAlt,
  faChartLine,
  faEnvelope,
  faUserCircle,
  faBook,
  faHashtag,
  faStar,
  faList,
  faAdjust,
  faGripVertical,
  faEraser,
  faTrashAlt,
  faPlus,
  faMinus,
  faExpandArrowsAlt,
  faCompressArrowsAlt,
  faPlusCircle,
  faLightbulb,
  faCircle,
  faDotCircle,
  faEdit,
  faPowerOff,
  faUserTag,
  faRoute,
  faTasks,
  faListAlt,
  faUndo,
  faMapMarkedAlt,
  faLocationArrow,
  faTag,
  faTags,
  faPrint,
  faEye,
  faEyeSlash,
  faChevronCircleRight,
  faStickyNote,
  faCalendarDay,
  faCalendarWeek,
  faCircleNotch,
  faLowVision,
  faPhone,
  faSms,
  faMagic,
  faIdCardAlt,
  faMoneyCheckAlt,
  faFileUpload,
  faFileCsv,
  faClone,
  faEllipsisH,
  faEllipsisV,
  faExternalLinkAlt,
  faVolumeUp,
  faVolumeMute,
  faIndustry,
  faCertificate,
  faLevelDownAlt,
  faBalanceScale,
  faLongArrowAltLeft,
  faFileContract,
  faFlag,
  faAlignJustify,
} from '@fortawesome/free-solid-svg-icons'
import {
  library as fontAwesomeIconLibrary,
  config,
  IconPrefix,
} from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import IconFacebook from '@/components/icons/IconFacebook.vue'
import IconInstagram from '@/components/icons/IconInstagram.vue'
import IconLinkedIn from '@/components/icons/IconLinkedIn.vue'
import IconFlagUnitedStates from '@/components/icons/IconFlagUnitedStates.vue'
import IconFlagMexico from '@/components/icons/IconFlagMexico.vue'
import IconSecurity from '@/components/icons/IconSecurity.vue'
import IconCertified from '@/components/icons/IconCertified.vue'
import IconAmpi from '@/components/icons/IconAmpi.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import IconLocalFill from '@/components/icons/IconLocalFill.vue'
import IconLocal from '@/components/icons/IconLocal.vue'
import IconMail from '@/components/icons/IconMail.vue'
import IconPhone from '@/components/icons/IconPhone.vue'
import IconCellPhone from '@/components/icons/IconCellPhone.vue'
import IconDoubleBed from '@/components/icons/IconDoubleBed.vue'
import IconBathroom from '@/components/icons/IconBathroom.vue'
import IconAdd from '@/components/icons/IconAdd.vue'
import IconShare from '@/components/icons/IconShare.vue'
import IconLeftC from '@/components/icons/IconLeftC.vue'
import IconRightC from '@/components/icons/IconRightC.vue'
import IconListCheckbox from '@/components/icons/IconListCheckbox.vue'
import IconAllApplication from '@/components/icons/IconAllApplication.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import IconMinus from '@/components/icons/IconMinus.vue'
import IconImages from '@/components/icons/IconImages.vue'
import IconPrinter from '@/components/icons/IconPrinter.vue'
import IconCloseSmall from '@/components/icons/IconCloseSmall.vue'
import IconEatingOut from '@/components/icons/IconEatingOut.vue'
import IconOutdoor from '@/components/icons/IconOutdoor.vue'
import IconEvents from '@/components/icons/IconEvents.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import IconCheck from '@/components/icons/IconCheck.vue'
import { Color, colors } from '@/design/system/helpers'
import { computed, defineComponent, PropType } from '@vue/composition-api'
import { Component } from 'vue'

// https://fontawesome.com/icons
fontAwesomeIconLibrary.add(
  faSync,
  faUser,
  faLanguage,
  faCaretDown,
  faTachometerAlt,
  faInfoCircle,
  faClock,
  faFire,
  faClipboardList,
  faExchangeAlt,
  faBars,
  faCube,
  faSignOutAlt,
  faExclamationCircle,
  faFileSignature,
  faLandmark,
  faBell,
  faExclamationTriangle,
  faCheck,
  faTimes,
  faChevronCircleDown,
  faThumbsDown,
  faCubes,
  faMapMarkerAlt,
  faSearch,
  faSlidersH,
  faCalendarAlt,
  faTruck,
  faQrcode,
  faPaintBrush,
  faPallet,
  faLayerGroup,
  faFill,
  faBox,
  faBoxOpen,
  faWeight,
  faWeightHanging,
  faToolbox,
  faTh,
  faThList,
  faSignInAlt,
  faLock,
  faKey,
  faPalette,
  faAngleLeft,
  faAngleRight,
  faAngleUp,
  faAngleDown,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleDoubleUp,
  faAngleDoubleDown,
  faCog,
  faCogs,
  faLink,
  faWarehouse,
  faTruckLoading,
  faBuilding,
  faFileInvoiceDollar,
  faUpload,
  faCloudUploadAlt,
  faFile,
  faShoppingCart,
  faFileInvoice,
  faDollarSign,
  faQuestionCircle,
  faThumbsUp,
  faPercentage,
  faPencilAlt,
  faSave,
  faCheckCircle,
  faTimesCircle,
  faFileAlt,
  faChartLine,
  faEnvelope,
  faUserCircle,
  faBook,
  faHashtag,
  faStar,
  faList,
  faAdjust,
  faGripVertical,
  faEraser,
  faTrashAlt,
  faPlus,
  faMinus,
  faExpandArrowsAlt,
  faCompressArrowsAlt,
  faPlusCircle,
  faLightbulb,
  faCircle,
  faDotCircle,
  faEdit,
  faPowerOff,
  faUserTag,
  faRoute,
  faTasks,
  faListAlt,
  faUndo,
  faMapMarkedAlt,
  faLocationArrow,
  faTag,
  faTags,
  faPrint,
  faEye,
  faEyeSlash,
  faChevronCircleRight,
  faStickyNote,
  faCalendarDay,
  faCalendarWeek,
  faCircleNotch,
  faLowVision,
  faPhone,
  faSms,
  faMagic,
  faIdCardAlt,
  faMoneyCheckAlt,
  faFileUpload,
  faFileCsv,
  faClone,
  faEllipsisH,
  faEllipsisV,
  faExternalLinkAlt,
  faVolumeUp,
  faVolumeMute,
  faIndustry,
  faCertificate,
  faLevelDownAlt,
  faBalanceScale,
  faLongArrowAltLeft,
  faFileContract,
  faFlag,
  faAlignJustify
)

const customIconComponentConfig: Record<
  string,
  Component<any, any, any, any>
> = {
  facebook: IconFacebook,
  instagram: IconInstagram,
  linkedin: IconLinkedIn,
  'flag-us': IconFlagUnitedStates,
  'flag-mx': IconFlagMexico,
  security: IconSecurity,
  certified: IconCertified,
  ampi: IconAmpi,
  'arrow-right': IconArrowRight,
  'local-fill': IconLocalFill,
  local: IconLocal,
  mail: IconMail,
  phone: IconPhone,
  cellphone: IconCellPhone,
  'double-bed': IconDoubleBed,
  bathroom: IconBathroom,
  add: IconAdd,
  share: IconShare,
  'left-c': IconLeftC,
  'right-c': IconRightC,
  'list-checkbox': IconListCheckbox,
  'all-application': IconAllApplication,
  plus: IconPlus,
  minus: IconMinus,
  images: IconImages,
  printer: IconPrinter,
  'close-small': IconCloseSmall,
  'eating-out': IconEatingOut,
  outdoor: IconOutdoor,
  events: IconEvents,
  search: IconSearch,
  check: IconCheck,
}

type BaseIconSource = 'font-awesome' | 'custom'

interface BaseIconToneConfig {
  name: string
  classes: string[]
}

export default defineComponent({
  name: 'BaseIcon',

  components: {
    FontAwesomeIcon,
  },

  props: {
    source: {
      type: String as PropType<BaseIconSource>,
      default: 'font-awesome',
    },

    name: {
      type: String,
      default: '',
    },

    prefix: {
      type: String as PropType<IconPrefix>,
      default: config.familyPrefix,
    },

    tone: {
      type: String as PropType<Color | null>,
      default: null,
      validator: (value: Color | null) => !value || colors.includes(value),
    },
  },

  setup(props) {
    const iconTone: Record<
      Color,
      Record<BaseIconSource, BaseIconToneConfig>
    > = {
      primary: {
        'font-awesome': {
          name: 'info-circle',
          classes: ['text-primary'],
        },
        custom: {
          name: '',
          classes: ['text-primary'],
        },
      },
      tertiary: {
        'font-awesome': {
          name: 'info-circle',
          classes: ['text-tertiary'],
        },
        custom: {
          name: '',
          classes: ['text-tertiary'],
        },
      },
      quaternary: {
        'font-awesome': {
          name: 'info-circle',
          classes: ['text-quaternary'],
        },
        custom: {
          name: '',
          classes: ['text-quaternary'],
        },
      },
      quinary: {
        'font-awesome': {
          name: 'info-circle',
          classes: ['text-quinary'],
        },
        custom: {
          name: '',
          classes: ['text-quinary'],
        },
      },
      critical: {
        'font-awesome': {
          name: 'exclamation-circle',
          classes: ['text-critical'],
        },
        custom: {
          name: '',
          classes: ['text-critical'],
        },
      },
      caution: {
        'font-awesome': {
          name: 'exclamation-triangle',
          classes: ['text-caution'],
        },
        custom: {
          name: '',
          classes: ['text-caution'],
        },
      },
      positive: {
        'font-awesome': {
          name: 'check-circle',
          classes: ['text-positive'],
        },
        custom: {
          name: '',
          classes: ['text-positive'],
        },
      },
      neutral: {
        'font-awesome': {
          name: 'info-circle',
          classes: ['text-neutral'],
        },
        custom: {
          name: '',
          classes: ['text-neutral'],
        },
      },
      secondary: {
        'font-awesome': {
          name: 'info-circle',
          classes: ['text-secondary'],
        },
        custom: {
          name: '',
          classes: ['text-secondary'],
        },
      },
      info: {
        'font-awesome': {
          name: 'info-circle',
          classes: ['text-info'],
        },
        custom: {
          name: '',
          classes: ['text-info'],
        },
      },
      promote: {
        'font-awesome': {
          name: 'star',
          classes: ['text-promote'],
        },
        custom: {
          name: '',
          classes: ['text-promote'],
        },
      },
    }

    const computedIconToneConfig = computed(() =>
      props.tone ? iconTone[props.tone][props.source] : undefined
    )

    const computedName = computed(
      () => props.name || computedIconToneConfig.value?.name
    )

    const isCustomComponent = props.source === 'custom'

    const customComponent = computed(
      () =>
        (isCustomComponent && customIconComponentConfig[props.name]) ||
        undefined
    )

    const computedClass = computed(() => [
      ...(computedIconToneConfig.value
        ? computedIconToneConfig.value.classes
        : []),
      ...(isCustomComponent ? ['CustomIcon'] : []),
    ])

    return {
      computedClass,
      computedName,
      customComponent,
    }
  },
})
</script>

<style lang="scss" scoped>
.CustomIcon {
  display: inline-block;
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
</style>
