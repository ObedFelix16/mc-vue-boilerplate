<template>
  <li>
    <slot />
  </li>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'BaseListItem',
})
</script>
