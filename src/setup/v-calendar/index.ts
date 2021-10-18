import { breakpointsRecords } from '@/design/system/helpers'
import VCalendar from 'v-calendar'
import Vue from 'vue'
import i18n from '../i18n'

export interface VCalendarDateRange {
  start: Date | null
  end: Date | null
  span?: number
}

export interface VCalendarDateRangeInputEvent {
  start: Date
  end: Date
}

Vue.use(VCalendar, {
  locale: i18n.fallbackLocale,
  screens: Object.entries(breakpointsRecords).reduce(
    (accumulator, [key, value]) => {
      accumulator[key] = `${value}px`
      return accumulator
    },
    {} as Record<string, string>
  ),
})
