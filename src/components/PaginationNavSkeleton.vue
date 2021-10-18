<template>
  <BaseBox class="flex space-x-4 animate-pulse">
    <BaseBox class="bg-gray-300 w-10 h-10 rounded-full" />
    <BaseBox class="bg-gray-300 w-10 h-10 rounded" />
    <BaseBox class="bg-gray-300 w-10 h-10 rounded" />
    <BaseBox class="bg-gray-300 w-10 h-10 rounded" />
    <BaseBox class="bg-gray-300 w-10 h-10 rounded-full" />
  </BaseBox>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'PaginationNavSkeleton',
})
</script>
