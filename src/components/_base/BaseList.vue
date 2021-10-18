<template>
  <Component :is="tag">
    <slot />
  </Component>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'BaseList',

  props: {
    tag: {
      type: String,
      required: true,
      validator: (value: string) => value === 'ol' || value === 'ul',
    },
  },
})
</script>
