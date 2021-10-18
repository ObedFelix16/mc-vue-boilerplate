<template>
  <BaseLink
    :to="routeTo"
    :class="[
      'inline-block px-4 py-2 text-gray-500 text-lg font-semibold',
      disabled ? '' : 'hover:text-gray-900',
      type === 'page' && !disabled ? 'hover:underline' : '',
      selected ? 'text-gray-900 underline' : '',
    ]"
  >
    <template v-if="type === 'page'">
      {{ pageNumber }}
    </template>
    <template v-if="type === 'first'"> first </template>
    <template v-else-if="type === 'previous'">
      <BaseIcon name="left-c" source="custom" />
    </template>
    <template v-else-if="type === 'start-ellipsis' || type === 'end-ellipsis'">
      ...
    </template>
    <template v-else-if="type === 'next'">
      <BaseIcon name="right-c" source="custom" />
    </template>
    <template v-else-if="type === 'last'"> last </template>
  </BaseLink>
</template>

<script lang="ts">
import { PaginationNavItemType } from '@/composition/pagination'
import { currentRoute } from '@/router'
import { Location } from 'vue-router'
import { computed, defineComponent, PropType } from '@vue/composition-api'

export default defineComponent({
  name: 'PaginationNav',

  props: {
    type: {
      type: String as PropType<PaginationNavItemType>,
      required: true,
    },

    pageNumber: {
      type: Number,
      required: true,
    },

    selected: {
      type: Boolean,
      required: true,
    },

    disabled: {
      type: Boolean,
      required: true,
    },
  },

  setup(props) {
    const routeTo = computed<Location | undefined>(() =>
      props.disabled || !currentRoute.value || !currentRoute.value.name
        ? undefined
        : {
            name: currentRoute.value.name,
            query: {
              ...currentRoute.value.query,
              pageNumber: props.pageNumber.toString(),
            },
          }
    )

    return {
      routeTo,
    }
  },
})
</script>
