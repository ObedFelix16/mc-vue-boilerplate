<template>
  <kbd class="BaseKbd">
    <slot />
  </kbd>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'BaseKbd',
})
</script>

<style lang="scss" scoped>
.BaseKbd {
  /* TODO: Support dark theme */
  background-color: #f7f7f7;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.2), 0 0 0 2px #fff inset;
  color: #333;
  display: inline-block;
  vertical-align: middle;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.7em;
  margin: 0 0.1em;
  padding: 0.1em 0.6em;
  text-shadow: 0 1px 0 #fff;
}
</style>
