<template>
  <BaseBox
    v-click-outside="closeMenu"
    tag="header"
    class="
      sticky
      top-0
      z-20
      bg-white
      shadow
      print:static
      print:shadow-none
      print:border-b
      print:border-gray-300
      print:py-4
    "
  >
    <BaseBox
      class="
        max-w-screen-lg
        xl:max-w-screen-xl
        2xl:max-w-screen-2xl
        3xl:max-w-screen-3xl
        mx-auto
        px-4
      "
    >
      <BaseBox
        class="
          flex
          space-x-4
          justify-between
          items-center
          py-1
          lg:py-0 lg:items-stretch lg:space-x-10
        "
      >
        <BaseHeading :level="1" class="lg:py-4">
          <BaseLink name="Home" class="block">
            <BaseText class="sr-only">{{ title }}</BaseText>
            <BrandLogo class="h-8 w-auto lg:h-20 print:h-20" />
          </BaseLink>
        </BaseHeading>
        <BaseBox class="lg:hidden print:hidden">
          <BaseButton
            variant="transparent"
            class="inline-flex items-center justify-center"
            @click="toggleMenu"
          >
            <BaseText class="sr-only">
              <i18n :tag="false" path="openMenu" />
            </BaseText>
            <BaseIcon name="bars" />
          </BaseButton>
        </BaseBox>
        <BaseBox
          tag="nav"
          class="
            hidden
            print:hidden
            lg:flex
            space-x-10
            lg:text-center
            xl:text-lg
          "
        >
          <BaseLink
            v-for="item in items"
            :key="item.id"
            :href="item.href"
            :to="item.toRoute"
            class="lg:flex lg:items-center font-medium"
          >
            <BaseText>
              <i18n :tag="false" :path="item.i18nPath" />
            </BaseText>
          </BaseLink>
        </BaseBox>
        <BaseBox class="hidden print:grid">
          <BaseBox class="grid gap-2 content-center">
            <BaseBox>
              <BaseBox class="flex space-x-2">
                <BaseText>
                  <BaseIcon name="local" source="custom" />
                </BaseText>
                <BaseText>
                  {{ address }}
                </BaseText>
              </BaseBox>
            </BaseBox>
            <BaseBox class="flex space-x-6 justify-end">
              <BaseBox class="flex space-x-2">
                <BaseText>
                  <BaseIcon name="phone" source="custom" />
                </BaseText>
                <BaseLink :href="`tel:${phone}`">
                  {{ formattedPhone }}
                </BaseLink>
              </BaseBox>
              <BaseBox class="flex space-x-2">
                <BaseText>
                  <BaseIcon name="mail" source="custom" />
                </BaseText>
                <BaseLink :href="`mailto:${email}`">
                  {{ email }}
                </BaseLink>
              </BaseBox>
            </BaseBox>
          </BaseBox>
        </BaseBox>
        <BaseBox
          class="
            hidden
            print:hidden
            lg:flex
            justify-end
            lg:items-center lg:space-x-12
            text-3xl
            lg:text-2xl
          "
        >
          <BaseBox class="flex space-x-2">
            <BaseLink
              v-for="(href, name) in socials"
              :key="name"
              :href="href"
              class="hover:text-secondary"
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
            <SiteLanguageLinks class="text-secondary" />
          </BaseBox>
        </BaseBox>
      </BaseBox>
    </BaseBox>
    <Transition
      enter-active-class="duration-200 ease-out"
      enter-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="duration-100 ease-in"
      leave-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <BaseBox
        v-if="isMobileMenuOpen"
        class="
          absolute
          top-0
          inset-x-0
          p-2
          transition
          transform
          origin-top-right
          lg:hidden
          print:hidden
        "
      >
        <BaseBox
          class="
            rounded-lg
            shadow-lg
            ring-1 ring-gray-900 ring-opacity-5
            bg-white
            overflow-hidden
          "
        >
          <BaseBox class="pt-5 pb-6 px-5">
            <BaseBox class="flex items-center justify-between">
              <BaseBox>
                <BaseText class="sr-only">{{ title }}</BaseText>
                <BrandLogo class="h-8 w-auto sm:h-20" />
              </BaseBox>
              <BaseBox>
                <BaseButton
                  variant="transparent"
                  class="inline-flex items-center justify-center"
                  @click="closeMenu"
                >
                  <BaseText class="sr-only">
                    <i18n :tag="false" path="closeMenu" />
                  </BaseText>
                  <BaseIcon name="times" />
                </BaseButton>
              </BaseBox>
            </BaseBox>
            <BaseBox class="mt-6">
              <BaseBox tag="nav" class="grid gap-y-8">
                <BaseLink
                  v-for="item in items"
                  :key="item.id"
                  :href="item.href"
                  :to="item.toRoute"
                  class="
                    -m-3
                    p-3
                    flex
                    items-center
                    rounded-md
                    hover:bg-gray-900 hover:bg-opacity-5
                  "
                >
                  <BaseText>
                    <i18n :tag="false" :path="item.i18nPath" />
                  </BaseText>
                </BaseLink>
              </BaseBox>
            </BaseBox>
            <BaseBox class="mt-6 text-2xl">
              <SiteLanguageLinks class="text-secondary" />
            </BaseBox>
          </BaseBox>
          <BaseBox class="py-6 px-5 space-y-6 bg-gray-100 bg-opacity-20">
            <BaseBox
              class="
                grid grid-cols-2
                gap-y-4 gap-x-8
                justify-items-center
                text-2xl
              "
            >
              <BaseLink
                v-for="(href, name) in socials"
                :key="name"
                :href="href"
                class="text-secondary"
              >
                <BaseText class="sr-only">
                  <i18n :tag="false" path="navigateToWebsite">
                    <template #website>{{ name }}</template>
                  </i18n>
                </BaseText>
                <BaseIcon source="custom" :name="name" />
              </BaseLink>
            </BaseBox>
          </BaseBox>
        </BaseBox>
      </BaseBox>
    </Transition>
  </BaseBox>
</template>

<i18n lang="json">
{
  "en-US": {
    "openMenu": "Open menu",
    "closeMenu": "Close menu"
  },
  "es-MX": {
    "openMenu": "Abrir menú",
    "closeMenu": "Cerrar menú"
  }
}
</i18n>

<script lang="ts">
import BrandLogo from '@/components/branding/BrandLogo.vue'
import SiteLanguageLinks from '@/components/SiteLanguageLinks.vue'
import { SiteHeaderItemConfig } from '@/composition/siteHeader'
import { formatPhoneNumber } from '@/utils/phone'
import { currentRoute } from '@/router'
import { title, socials, address, phone, email } from '@/app.config.json'
import { defineComponent, PropType, ref, watch } from '@vue/composition-api'

export default defineComponent({
  name: 'SiteHeader',

  components: {
    BrandLogo,
    SiteLanguageLinks,
  },

  props: {
    items: {
      type: Array as PropType<SiteHeaderItemConfig[]>,
      required: true,
    },
  },

  setup() {
    const isMobileMenuOpen = ref(false)

    watch(
      () => currentRoute.value,
      () => {
        isMobileMenuOpen.value = false
      }
    )

    function closeMenu(): void {
      if (!isMobileMenuOpen.value) return
      isMobileMenuOpen.value = false
    }

    function toggleMenu(): void {
      isMobileMenuOpen.value = !isMobileMenuOpen.value
    }

    return {
      title,
      socials,
      address,
      phone,
      formattedPhone: formatPhoneNumber(phone),
      email,
      isMobileMenuOpen,
      closeMenu,
      toggleMenu,
    }
  },
})
</script>
