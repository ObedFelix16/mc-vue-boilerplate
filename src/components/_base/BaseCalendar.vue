<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'BaseCalendar',

  functional: true,

  render(createElement, context) {
    return createElement('v-calendar', context.data, context.children)
  },
})
</script>
