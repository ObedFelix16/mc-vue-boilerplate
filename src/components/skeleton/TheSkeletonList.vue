<template>
  <transition :css="false">
    <div :style="skeletonListStyle" class="skeleton-list">
      <TheSkeleton
        v-for="item in itemList"
        :key="item"
        v-bind="$attrs"
        v-on="$listeners"
      />
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue'
import TheSkeleton from './TheSkeleton.vue'

export default Vue.extend({
  name: 'TheSkeletonList',

  components: { TheSkeleton },

  inheritAttrs: false,

  props: {
    items: {
      type: Number,
      required: true,
    },

    itemsPerColumn: {
      type: [String, Number],
      default: 'auto-fit',
    },

    minItemSize: {
      type: String,
      default: '100px',
    },

    maxItemSize: {
      type: String,
      default: '1fr',
    },

    itemGap: {
      type: String,
      default: '10px',
    },
  },

  computed: {
    itemList(): number[] {
      return Array.from(Array(this.items).keys())
    },

    skeletonListStyle(): Record<string, string> {
      return {
        gridTemplateColumns: `repeat(${this.itemsPerColumn}, minmax(${this.minItemSize},${this.maxItemSize}))`,
        gridGap: this.itemGap,
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.skeleton-list {
  display: grid;
}
</style>
