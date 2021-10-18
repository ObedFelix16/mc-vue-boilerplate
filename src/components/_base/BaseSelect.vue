<script lang="ts">
import Vue, { VNode } from 'vue'

export default Vue.extend({
  name: 'BaseSelect',

  functional: true,

  render(createElement, context): VNode {
    const isAsync = context.data.attrs && context.data.attrs.searchable

    context.data.attrs = {
      placeholder: context.parent.$t(
        `multiselect.${isAsync ? 'asyncPlaceholder' : 'placeholder'}`
      ),
      'tag-placeholder': context.parent.$t('multiselect.tagPlaceholder'),
      'select-label': context.parent.$t('multiselect.selectLabel'),
      'selected-label': context.parent.$t('multiselect.selectedLabel'),
      'deselect-label': context.parent.$t('multiselect.deselectLabel'),
      ...context.data.attrs,
    }

    context.data.scopedSlots = {
      noOptions() {
        return createElement(
          'span',
          context.parent.$t(
            `multiselect.${isAsync ? 'asyncNoOptions' : 'noOptions'}`
          ) as string
        )
      },
      ...context.data.scopedSlots,
    }

    return createElement('Multiselect', context.data, context.children)
  },
})
</script>
