<template>
  <BaseBox tag="strong" class="font-semibold">
    <slot />
  </BaseBox>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'BaseStrong',
})
</script>
