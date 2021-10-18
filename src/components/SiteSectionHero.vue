<template>
  <SiteSection>
    <template #container>
      <BaseBox tag="section" class="relative" style="height: 80vh">
        <BaseBox class="h-full grid grid-rows-1 grid-cols-1">
          <BaseBox
            class="md:px-6 md:pt-6 md:pb-20 h-full row-start-1 col-start-1"
          >
            <BaseBox
              class="
                h-full
                w-full
                relative
                md:rounded-lg
                bg-gray-200
                overflow-hidden
              "
            >
            </BaseBox>
          </BaseBox>
          <BaseBox
            class="
              relative
              max-w-screen-lg
              xl:max-w-screen-xl
              mx-auto
              row-start-1
              col-start-1
              self-center
              md:self-end
            "
          >
            <BaseBox class="px-4 md:px-0">
              <BaseBox
                :class="[
                  'rounded-lg overflow-hidden transition',
                  currentCtaBoxClasses,
                ]"
              >
                <BaseText
                  tag="p"
                  class="
                    text-white
                    font-semibold
                    leading-snug
                    text-2xl
                    md:text-6xl md:leading-snug
                    py-6
                    px-16
                    text-center
                  "
                >
                  <i18n :tag="false" path="cta.copy">
                    <template #br>
                      <br />
                    </template>
                  </i18n>
                </BaseText>
                <BaseBox
                  class="
                    grid grid-cols-2
                    md:h-20
                    text-white
                    font-semibold
                    text-lg
                    md:text-3xl
                    uppercase
                    text-center
                  "
                >
                  <i18n :tag="false" path="cta.rent" />
                </BaseBox>
              </BaseBox>
            </BaseBox>
          </BaseBox>
        </BaseBox>
      </BaseBox>
    </template>
  </SiteSection>
</template>

<i18n lang="json">
{
  "en-US": {
    "cta": {
      "copy": "Discover the place{br}you'll love to...",
      "buy": "Buy",
      "rent": "Rent"
    }
  },
  "es-MX": {
    "cta": {
      "copy": "Descubre el lugar{br}que te gustaría...",
      "buy": "Comprar",
      "rent": "Rentar"
    }
  }
}
</i18n>

<script lang="ts">
import SiteSection from '@/components/SiteSection.vue'
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  name: 'SiteSectionHero',

  components: {
    SiteSection,
  },

  setup() {
    const defaultCtaBoxClasses = 'bg-black bg-opacity-60'
    const currentCtaBoxClasses = ref(defaultCtaBoxClasses)

    function onLinkMouseEnter(classes: string) {
      currentCtaBoxClasses.value = classes
    }

    function onLinkMouseLeave() {
      currentCtaBoxClasses.value = defaultCtaBoxClasses
    }

    return {
      currentCtaBoxClasses,
      onLinkMouseEnter,
      onLinkMouseLeave,
    }
  },
})
</script>
