<template>
  <input
    ref="inputEl"
    type="file"
    v-bind="computedAttrs"
    @change="onChange($event.target.files)"
    v-on="$listeners"
  />
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  name: 'BaseInputText',

  inheritAttrs: false,

  model: {
    event: 'update',
  },

  props: {
    clearOnSelect: {
      type: Boolean,
      default: false,
    },
  },

  emits: {
    update: null,
  },

  setup(props, context) {
    const inputEl = ref<HTMLInputElement | null>(null)

    const computedAttrs = computed(() => {
      const attributes = { ...context.attrs }
      delete attributes.value
      return attributes
    })

    function onChange(files: FileList) {
      context.emit('update', Array.from(files))

      if (props.clearOnSelect && inputEl.value) {
        inputEl.value.value = ''
      }
    }

    return {
      inputEl,
      computedAttrs,
      onChange,
    }
  },
})
</script>
