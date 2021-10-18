<template>
  <BaseBox tag="span" class="text-secondary">
    <slot />
  </BaseBox>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'BaseSecondary',
})
</script>
