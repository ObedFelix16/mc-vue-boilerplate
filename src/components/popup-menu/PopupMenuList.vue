<template>
  <ul :style="componentStyle" class="PopupMenuList">
    <PopupMenuListItem
      v-for="(item, index) in items"
      :key="index"
      :item="item"
      @close="$emit('close')"
    />
  </ul>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import PopupMenuListItem, {
  PopupMenuListItemConfig,
} from './PopupMenuListItem.vue'

export default Vue.extend({
  name: 'PopupMenuList',

  components: {
    PopupMenuListItem,
  },

  props: {
    items: {
      type: Array as PropType<PopupMenuListItemConfig[]>,
      default: () => [],
    },

    maxWidth: {
      type: Number,
      default: null,
    },
  },

  computed: {
    componentStyle(): Record<string, any> {
      return {
        maxWidth: this.maxWidth,
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.PopupMenuList {
  list-style-type: none;
  box-shadow: var(--shadow-standard);
  background-color: var(--theme-background-popup);
  color: var(--theme-color-popup);
  border-radius: var(--border-radius-base);
  overflow: hidden;
}
</style>
