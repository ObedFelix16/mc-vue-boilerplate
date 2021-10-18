<template>
  <BaseBox>
    <SiteSectionHero />
  </BaseBox>
</template>

<script lang="ts">
import SiteSectionHero from '@/components/SiteSectionHero.vue'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'Home',

  components: {
    SiteSectionHero,
  },
})
</script>
