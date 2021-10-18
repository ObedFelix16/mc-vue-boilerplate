<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
    <g fill="currentColor">
      <path
        fill-rule="evenodd"
        d="M1.667 1.667a.833.833 0 00-.834.833v3.333c0 .46.374.834.834.834H5c.46 0 .833-.373.833-.834V2.5A.833.833 0 005 1.667H1.667zM2.5 5V3.333h1.667V5H2.5z"
        clip-rule="evenodd"
      />
      <path
        d="M7.5 4.167c0-.46.373-.834.834-.834h10a.833.833 0 110 1.667h-10a.833.833 0 01-.834-.833zM8.334 9.167a.833.833 0 000 1.666h10a.833.833 0 100-1.666h-10zM8.334 15a.833.833 0 000 1.667h10a.833.833 0 100-1.667h-10z"
      />
      <path
        fill-rule="evenodd"
        d="M1.667 13.333a.833.833 0 00-.834.834V17.5c0 .46.374.833.834.833H5c.46 0 .833-.373.833-.833v-3.333A.833.833 0 005 13.333H1.667zm.833 3.334V15h1.667v1.667H2.5zM.833 8.333c0-.46.374-.833.834-.833H5c.46 0 .833.373.833.833v3.334c0 .46-.373.833-.833.833H1.667a.833.833 0 01-.834-.833V8.333zm1.667.834v1.666h1.667V9.167H2.5z"
        clip-rule="evenodd"
      />
    </g>
  </svg>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'IconListCheckbox',
})
</script>
