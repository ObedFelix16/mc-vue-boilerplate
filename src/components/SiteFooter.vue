<template>
  <BaseBox tag="footer" class="text-white bg-secondary-500">
    <BaseBox class="relative flex justify-center bg-quaternary-800 xl:z-10">
      <BaseImage
        src="@/assets/images/footer.png"
        alt=""
        class="absolute w-full h-full object-cover object-top opacity-50"
      />
      <BaseBox
        class="
          relative
          max-w-screen-lg
          xl:max-w-screen-xl
          2xl:max-w-screen-2xl
          3xl:max-w-screen-3xl
          w-full
        "
      >
        <BaseBox
          class="
            px-4
            py-14
            grid
            gap-10
            items-start
            xl:grid-rows-none xl:gap-12 xl:grid-cols-6
          "
        >
          <BaseBox
            tag="section"
            class="xl:row-start-auto xl:col-span-2 grid gap-4"
          >
            <BaseHeading :level="1" class="font-semibold text-lg">
              <i18n :tag="false" path="contactUs" />
            </BaseHeading>
            <BaseList tag="ul" class="grid gap-2 text-lg">
              <BaseListItem class="flex space-x-4">
                <BaseText>
                  <BaseIcon name="local" source="custom" />
                </BaseText>
                <BaseText>
                  {{ address }}
                </BaseText>
              </BaseListItem>
              <BaseListItem class="flex space-x-4">
                <BaseText>
                  <BaseIcon name="phone" source="custom" />
                </BaseText>
                <BaseLink :href="`tel:${phone}`">
                  {{ formattedPhone }}
                </BaseLink>
              </BaseListItem>
              <BaseListItem class="flex space-x-4">
                <BaseText>
                  <BaseIcon name="mail" source="custom" />
                </BaseText>
                <BaseLink :href="`mailto:${email}`">
                  {{ email }}
                </BaseLink>
              </BaseListItem>
            </BaseList>
          </BaseBox>
          <BaseBox tag="section" class="hidden md:grid md:gap-4 xl:col-span-1">
            <BaseHeading :level="1" class="font-semibold text-lg">
              <i18n :tag="false" path="siteMap" />
            </BaseHeading>
            <BaseList tag="ul" class="grid gap-2 text-lg">
              <BaseListItem v-for="item in siteMapItems" :key="item.id">
                <BaseLink :href="item.href" :to="item.toRoute">
                  <BaseText>
                    <i18n :tag="false" :path="item.i18nPath" />
                  </BaseText>
                </BaseLink>
              </BaseListItem>
            </BaseList>
          </BaseBox>
          <BaseBox
            tag="section"
            class="row-start-1 xl:row-start-auto xl:col-span-3 xl:-mb-24"
          >
            <BaseBox
              class="
                relative
                rounded-lg
                overflow-hidden
                aspect-w-16 aspect-h-9
                transform-gpu
              "
            >
              <GmapMap
                :center="companyPosition"
                :zoom="15"
                class="absolute inset-0 w-full h-full"
              >
                <GmapMarker v-bind="markerOptions" />
              </GmapMap>
            </BaseBox>
          </BaseBox>
          <BaseBox class="flex space-x-6 items-center md:hidden">
            <BaseBox class="flex space-x-2 text-2xl">
              <BaseLink
                v-for="(href, name) in socials"
                :key="name"
                :href="href"
                class="text-quaternary-50 hover:text-white"
              >
                <BaseText class="sr-only">
                  <i18n :tag="false" path="navigateToWebsite">
                    <template #website>{{ name }}</template>
                  </i18n>
                </BaseText>
                <BaseIcon source="custom" :name="name" />
              </BaseLink>
            </BaseBox>
            <BaseBox>
              <SiteLanguageLinks class="text-white" />
            </BaseBox>
          </BaseBox>
        </BaseBox>
      </BaseBox>
    </BaseBox>
    <BaseBox class="relative flex justify-center bg-secondary-800">
      <BaseBox
        class="
          max-w-screen-lg
          xl:max-w-screen-xl
          2xl:max-w-screen-2xl
          3xl:max-w-screen-3xl
          w-full
        "
      >
        <BaseBox
          class="
            text-center
            px-4
            py-8
            grid
            gap-6
            md:text-left
            xl:gap-12 xl:grid-cols-6 xl:items-center
          "
        >
          <BaseText class="xl:col-span-2">
            <i18n :tag="false" path="copyright">
              <template #year>
                {{ currentYear }}
              </template>
            </i18n>
          </BaseText>
          <BaseBox
            class="xl:col-span-1 hidden md:flex md:space-x-6 md:items-center"
          >
            <BaseBox class="flex space-x-2 text-2xl">
              <BaseLink
                v-for="(href, name) in socials"
                :key="name"
                :href="href"
                class="text-quaternary-50 hover:text-white"
              >
                <BaseText class="sr-only">
                  <i18n :tag="false" path="navigateToWebsite">
                    <template #website>{{ name }}</template>
                  </i18n>
                </BaseText>
                <BaseIcon source="custom" :name="name" />
              </BaseLink>
            </BaseBox>
            <BaseBox>
              <SiteLanguageLinks class="text-white" />
            </BaseBox>
          </BaseBox>
        </BaseBox>
      </BaseBox>
    </BaseBox>
  </BaseBox>
</template>

<i18n lang="json">
{
  "en-US": {
    "contactUs": "Contact Us",
    "siteMap": "Sitemap",
    "copyright": "Copyright © {year} | All Rights Reserved.",
    "privacyNotice": "Privacy notice"
  },
  "es-MX": {
    "contactUs": "Contáctanos",
    "siteMap": "Mapa del Sitio",
    "copyright": "Copyright © {year} | Reservados todos los derechos.",
    "privacyNotice": "Aviso de privacidad"
  }
}
</i18n>

<script lang="ts">
import SiteLanguageLinks from '@/components/SiteLanguageLinks.vue'
import { formatPhoneNumber } from '@/utils/phone'
import { SiteHeaderItemConfig } from '@/composition/siteHeader'
import { address, phone, email, socials, geolocation } from '@/app.config.json'
import { computed, defineComponent, PropType } from '@vue/composition-api'

export default defineComponent({
  name: 'SiteFooter',

  components: {
    SiteLanguageLinks,
  },

  props: {
    siteMapItems: {
      type: Array as PropType<SiteHeaderItemConfig[]>,
      required: true,
    },
  },

  setup() {
    const currentYear = computed(() => new Date().getUTCFullYear())

    const companyPosition = computed(() => ({
      lat: Number.parseFloat(geolocation.latitude),
      lng: Number.parseFloat(geolocation.longitude),
    }))

    const markerOptions = computed<google.maps.MarkerOptions>(() => ({
      position: companyPosition.value,
      icon: {
        path: 'M17.3608 3.1584C16.1344 1.728 13.8712 0.0216 10.0672 0H9.93758C6.12878 0.0216 3.86558 1.728 2.63918 3.1584C1.18867 4.86508 0.387176 7.02902 0.375977 9.2688C0.375977 16.7088 8.87438 23.4504 9.23438 23.7336C9.45413 23.9056 9.72582 23.9979 10.0049 23.9953C10.284 23.9927 10.5539 23.8953 10.7704 23.7192C11.3152 23.3016 19.624 16.6632 19.624 9.2688C19.6128 7.02902 18.8113 4.86508 17.3608 3.1584ZM9.99998 13.2144C9.27705 13.2144 8.57035 13 7.96926 12.5984C7.36816 12.1967 6.89967 11.6259 6.62301 10.958C6.34636 10.2901 6.27397 9.55515 6.41501 8.84611C6.55605 8.13707 6.90417 7.48577 7.41536 6.97458C7.92655 6.46339 8.57784 6.11527 9.28688 5.97423C9.99592 5.8332 10.7309 5.90558 11.3988 6.18224C12.0667 6.45889 12.6375 6.92738 13.0392 7.52848C13.4408 8.12957 13.6552 8.83627 13.6552 9.5592C13.6552 10.5286 13.2701 11.4583 12.5846 12.1438C11.8991 12.8293 10.9694 13.2144 9.99998 13.2144Z',
        scale: 1.5,
        fillColor: '#ff681d',
        fillOpacity: 1,
        strokeOpacity: 1,
        strokeWeight: 2,
        strokeColor: '#fff',
        anchor: { x: 10, y: 20 } as google.maps.Point,
      },
    }))

    return {
      currentYear,
      address,
      phone,
      formattedPhone: formatPhoneNumber(phone),
      email,
      socials,
      companyPosition,
      markerOptions,
    }
  },
})
</script>
