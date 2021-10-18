import { Location } from 'vue-router'

export interface SiteHeaderConfig {
  items: SiteHeaderItemConfig[]
}

export interface SiteHeaderItemConfig {
  id: string
  i18nPath: string
  href?: string
  toRoute?: Location
}

export function useSiteHeader({ items }: SiteHeaderConfig) {
  return {
    items,
  }
}
