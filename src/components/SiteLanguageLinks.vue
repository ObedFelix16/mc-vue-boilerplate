<template>
  <BaseBox class="flex space-x-4">
    <BaseLink
      v-for="(link, index) in links"
      :key="link.locale"
      :class="[
        'text-2xl',
        currentLocale === link.locale
          ? 'pointer-events-none'
          : 'cursor-pointer',
        { 'pr-4 border-r-2 border-current': index !== links.length - 1 },
      ]"
      @click="loadLanguageAsync(link.locale)"
    >
      <BaseIcon
        :name="link.icon"
        :class="[
          'hover:filter-none',
          { 'filter grayscale': currentLocale !== link.locale },
        ]"
        source="custom"
      />
    </BaseLink>
  </BaseBox>
</template>

<script lang="ts">
import { enUs, esMx } from '@/utils/language'
import { unitedStates, mexico } from '@/utils/country'
import i18n, { loadLanguageAsync } from '@/setup/i18n'
import { computed, defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'SiteLanguageLinks',

  setup() {
    const currentLocale = computed(() => i18n.locale)

    const links = [
      {
        locale: enUs.locale,
        icon: `flag-${unitedStates.abbr}`,
      },
      {
        locale: esMx.locale,
        icon: `flag-${mexico.abbr}`,
      },
    ]

    return {
      currentLocale,
      links,
      loadLanguageAsync,
    }
  },
})
</script>
