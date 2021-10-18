<script lang="ts">
import Vue, { VNode } from 'vue'

export default Vue.extend({
  name: 'BaseTable',

  functional: true,

  render(createElement, context): VNode {
    const isRemote = context.data.attrs && context.data.attrs.mode === 'remote'

    context.data.attrs = {
      ...{
        // Default table options
        theme: 'polar-bear',
      },
      ...context.data.attrs,
      ...{
        'pagination-options': {
          enabled: isRemote || undefined,
          dropdownAllowAll: isRemote ? false : undefined,
          nextLabel: context.parent.$t('paginationOptions.next'),
          prevLabel: context.parent.$t('paginationOptions.previous'),
          rowsPerPageLabel: context.parent.$t('paginationOptions.rowsPerPage'),
          ofLabel: context.parent.$t('paginationOptions.of'),
          pageLabel: context.parent.$t('paginationOptions.page'),
          allLabel: context.parent.$t('paginationOptions.all'),
          ...context.data.attrs?.['pagination-options'],
        },

        'select-options': {
          selectionText: context.parent
            .$t('paginationOptions.rowsSelected')
            .toString()
            .toLowerCase(),
          clearSelectionText: context.parent.$t('paginationOptions.clear'),
          ...context.data.attrs?.['select-options'],
        },
      },
    }
    return createElement('vue-good-table', context.data, context.children)
  },
})
</script>
