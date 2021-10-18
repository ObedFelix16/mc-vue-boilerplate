<template>
  <div v-click-outside="handleClickOutside" class="PopupMenu">
    <slot :toggle="toggle" :icon="icon" name="trigger">
      <PopupMenuTrigger
        :icon="icon"
        variant="light"
        @click="toggle"
        @keydown.enter="toggle"
      />
    </slot>
    <PopupMenuBody v-model="open">
      <slot :items="items" name="list">
        <PopupMenuList
          :items="items"
          :max-width="maxWidth"
          @close="open = false"
        />
      </slot>
    </PopupMenuBody>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import PopupMenuTrigger from './PopupMenuTrigger.vue'
import PopupMenuBody, { PopupPosition } from './PopupMenuBody.vue'
import PopupMenuList from './PopupMenuList.vue'
import { PopupMenuListItemConfig } from './PopupMenuListItem.vue'

export default Vue.extend({
  name: 'PopupMenu',

  components: {
    PopupMenuTrigger,
    PopupMenuBody,
    PopupMenuList,
  },

  props: {
    icon: {
      type: String,
      default: 'ellipsis-v',
    },

    position: {
      type: String as PropType<PopupPosition>,
      default: PopupPosition.BottomLeft,
      validator: (value: string) =>
        Object.values(PopupPosition).includes(value as PopupPosition),
    },

    maxWidth: {
      type: Number,
      default: 300,
    },

    items: {
      type: Array as PropType<PopupMenuListItemConfig[]>,
      default: () => [],
    },
  },

  data() {
    return {
      open: false,
    }
  },

  methods: {
    toggle(): void {
      this.open = !this.open
    },

    handleClickOutside(): void {
      if (this.open) this.open = false
    },
  },
})
</script>

<style lang="scss" scoped>
.PopupMenu {
  display: inline-grid;
  align-items: center;
  position: relative;
}
</style>
