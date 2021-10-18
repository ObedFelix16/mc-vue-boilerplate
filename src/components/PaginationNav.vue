<template>
  <BaseBox tag="nav" class="flex space-x-4">
    <PaginationNavItem
      v-for="item in items"
      :key="item.key"
      :type="item.type"
      :page-number="item.pageNumber"
      :selected="item.selected"
      :disabled="item.disabled"
    />
  </BaseBox>
</template>

<script lang="ts">
import { usePagination } from '@/composition/pagination'
import { defineComponent, toRefs } from '@vue/composition-api'
import PaginationNavItem from './PaginationNavItem.vue'

export default defineComponent({
  name: 'PaginationNav',

  components: {
    PaginationNavItem,
  },

  props: {
    pageNumber: {
      type: Number,
      required: true,
    },

    rowsPerPage: {
      type: Number,
      required: true,
    },

    totalItems: {
      type: Number,
      required: true,
    },

    boundaryCount: {
      type: Number,
      default: 1,
    },

    siblingCount: {
      type: Number,
      default: 1,
    },
  },

  setup(props) {
    const { items } = usePagination(toRefs(props))

    return {
      items,
    }
  },
})
</script>
