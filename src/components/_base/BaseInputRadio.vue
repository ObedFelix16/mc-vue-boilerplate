<template>
  <input
    :checked="modelValue === $attrs.value"
    v-bind="$attrs"
    type="radio"
    @change="onChange($event.target.value)"
    v-on="$listeners"
  />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'BaseInputRadio',

  inheritAttrs: false,

  model: {
    prop: 'modelValue',
    event: 'update',
  },

  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },

  emits: {
    update: null,
  },

  setup(props, context) {
    function onChange(newVal: string) {
      context.emit('update', newVal)
    }

    return {
      onChange,
    }
  },
})
</script>
