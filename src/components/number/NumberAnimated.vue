<template>
  <Component :is="tag" class="tabular-nums">
    {{ animatedNumber }}
  </Component>
</template>

<script lang="ts">
import i18n from '@/setup/i18n'
import { gsap } from 'gsap'
import {
  computed,
  defineComponent,
  PropType,
  reactive,
  watch,
} from '@vue/composition-api'

export default defineComponent({
  name: 'NumberAnimated',

  props: {
    tag: {
      type: String,
      default: 'span',
    },

    value: {
      type: [String, Number],
      default: 0,
    },

    minimumFractionDigits: {
      type: Number as PropType<number | null>,
      default: null,
    },

    maximumFractionDigits: {
      type: Number as PropType<number | null>,
      default: null,
    },

    fractionDigits: {
      type: Number,
      default: 0,
    },

    duration: {
      type: Number,
      default: 0.45,
    },

    delay: {
      type: Number,
      default: 0,
    },

    currency: {
      type: Boolean,
      default: false,
    },

    abbreviate: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const data = reactive({
      tweenedNumber: 0,
    })

    watch(
      () => props.value,
      (newValue) => {
        gsap.to(data, {
          duration: props.duration,
          delay: props.delay,
          tweenedNumber: newValue,
        })
      },
      {
        immediate: true,
      }
    )

    const si = [
      { value: 1, symbol: '' },
      { value: 1e3, symbol: 'k' },
      { value: 1e6, symbol: 'M' },
      { value: 1e9, symbol: 'G' },
      { value: 1e12, symbol: 'T' },
      { value: 1e15, symbol: 'P' },
      { value: 1e18, symbol: 'E' },
    ]

    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/

    const currencyOptions = computed(() => {
      return props.currency
        ? {
            style: 'currency',
            currency: 'USD',
          }
        : {}
    })

    const fractionDigitsOptions = computed(() => {
      return {
        minimumFractionDigits:
          props.minimumFractionDigits !== null
            ? props.minimumFractionDigits
            : props.fractionDigits,
        maximumFractionDigits:
          props.maximumFractionDigits !== null
            ? props.maximumFractionDigits
            : props.fractionDigits,
      }
    })

    const animatedNumber = computed(() => {
      if (props.abbreviate) {
        let i
        for (i = si.length - 1; i > 0; i--) {
          if (data.tweenedNumber >= si[i].value) {
            break
          }
        }
        return (
          (data.tweenedNumber / si[i].value)
            .toLocaleString(i18n.locale, {
              ...fractionDigitsOptions.value,
            })
            .replace(rx, '$1') + si[i].symbol
        )
      }

      return data.tweenedNumber.toLocaleString(i18n.locale, {
        ...currencyOptions.value,
        ...fractionDigitsOptions.value,
      })
    })

    return {
      animatedNumber,
    }
  },
})
</script>
