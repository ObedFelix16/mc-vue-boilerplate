<template>
  <BaseButton
    class="UserMenuListItemMenu__trigger"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'PopupMenuTrigger',

  inheritAttrs: false,
})
</script>
