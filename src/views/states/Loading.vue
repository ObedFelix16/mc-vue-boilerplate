<template>
  <BaseBox class="h-96 grid place-items-center">
    <LoadingSpinner class="text-tertiary" />
  </BaseBox>
</template>

<script lang="ts">
import LoadingSpinner from '@/components/loader/LoadingSpinner.vue'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'Loading',

  components: {
    LoadingSpinner,
  },
})
</script>
