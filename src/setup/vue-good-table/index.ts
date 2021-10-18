import VueGoodTablePlugin from 'vue-good-table'
import Vue from 'vue'
import 'vue-good-table/dist/vue-good-table.css'

export interface VueGoodTableColumn<T = unknown> {
  label: string
  field?: keyof T | ((row: T) => string)
  type?: 'text' | 'number' | 'decimal' | 'percentage' | 'boolean' | 'date'
  dateInputFormat?: string
  dateOutputFormat?: string
  sortable?: boolean
  firstSortType?: 'asc' | 'desc'
  sortFn?: (...args: any[]) => any
  formatFn?: (value: any, row: T) => any
  html?: boolean
  width?: string
  hidden?: boolean
  thClass?: string
  tdClass?: string
  tdClassFunc?: (row: T) => string
  globalSearchDisabled?: boolean
}

export interface VueGoodTablePageChangeEvent {
  currentPage: number
  currentPerPage: number
  prevPage: number
  total: number
}

export interface VueGoodTablePerPageChangeEvent {
  currentPage: number
  currentPerPage: number
  total: number
}
Vue.use(VueGoodTablePlugin)
