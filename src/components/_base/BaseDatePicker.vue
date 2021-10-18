<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'BaseDatePicker',

  functional: true,

  render(createElement, context) {
    return createElement('v-date-picker', context.data, context.children)
  },
})
</script>
