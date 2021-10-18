<template>
  <BaseBox :tag="tag">
    <slot :formatted-date="formattedDate">
      {{ formattedDate }}
    </slot>
  </BaseBox>
</template>

<script lang="ts">
import { esMx } from '@/utils/language'
import { parseISO, formatDistance } from 'date-fns'
import { es, enUS } from 'date-fns/locale'
import Vue, { PropType } from 'vue'

export default Vue.extend({
  name: 'BaseDate',

  props: {
    tag: {
      type: String,
      default: 'span',
    },

    date: {
      type: [String, Date] as PropType<string | Date>,
      required: true,
    },

    now: {
      type: Date as PropType<Date>,
      default: () => new Date(),
    },

    distance: {
      type: Boolean,
      default: false,
    },

    localeMatcher: {
      type: String as PropType<
        Intl.DateTimeFormatOptions['localeMatcher'] | undefined
      >,
      default: undefined,
    },

    weekday: {
      type: String as PropType<
        Intl.DateTimeFormatOptions['weekday'] | undefined
      >,
      default: undefined,
    },

    era: {
      type: String as PropType<Intl.DateTimeFormatOptions['era'] | undefined>,
      default: undefined,
    },

    year: {
      type: String as PropType<Intl.DateTimeFormatOptions['year'] | undefined>,
      default: 'numeric' as Intl.DateTimeFormatOptions['year'],
    },

    month: {
      type: String as PropType<Intl.DateTimeFormatOptions['month'] | undefined>,
      default: 'short' as Intl.DateTimeFormatOptions['month'],
    },

    day: {
      type: String as PropType<Intl.DateTimeFormatOptions['day'] | undefined>,
      default: '2-digit' as Intl.DateTimeFormatOptions['day'],
    },

    hour: {
      type: String as PropType<Intl.DateTimeFormatOptions['hour'] | undefined>,
      default: undefined,
    },

    minute: {
      type: String as PropType<
        Intl.DateTimeFormatOptions['minute'] | undefined
      >,
      default: undefined,
    },

    second: {
      type: String as PropType<
        Intl.DateTimeFormatOptions['second'] | undefined
      >,
      default: undefined,
    },

    timeZoneName: {
      type: String as PropType<
        Intl.DateTimeFormatOptions['timeZoneName'] | undefined
      >,
      default: undefined,
    },

    formatMatcher: {
      type: String as PropType<
        Intl.DateTimeFormatOptions['formatMatcher'] | undefined
      >,
      default: undefined,
    },

    hour12: {
      type: Boolean as PropType<
        Intl.DateTimeFormatOptions['hour12'] | undefined
      >,
      default: undefined,
    },

    timeZone: {
      type: String as PropType<
        Intl.DateTimeFormatOptions['timeZone'] | undefined
      >,
      default: undefined,
    },

    options: {
      type: Object as PropType<Intl.DateTimeFormatOptions | undefined>,
      default: undefined,
    },

    fallbackLocale: {
      type: String,
      default: 'en-US',
    },
  },

  computed: {
    dateTimeFormatOptions(): Intl.DateTimeFormatOptions {
      return (
        this.options || {
          localeMatcher: this.localeMatcher,
          weekday: this.weekday,
          era: this.era,
          year: this.year,
          month: this.month,
          day: this.day,
          hour: this.hour,
          minute: this.minute,
          second: this.second,
          timeZoneName: this.timeZoneName,
          formatMatcher: this.formatMatcher,
          hour12: this.hour12,
          timeZone: this.timeZone,
        }
      )
    },

    formattedDate(): string {
      let date: Date

      if (!this.date) date = this.now

      date = typeof this.date === 'string' ? parseISO(this.date) : this.date

      if (this.distance) {
        // date-fns does not support 'es-MX' locale, use 'es' instead
        return formatDistance(date, this.now, {
          locale: this.$i18n && this.$i18n.locale === esMx.locale ? es : enUS,
          addSuffix: true,
          includeSeconds: true,
        })
      }

      return date.toLocaleDateString(
        this.$i18n ? this.$i18n.locale : this.fallbackLocale,
        this.dateTimeFormatOptions
      )
    },
  },
})
</script>
