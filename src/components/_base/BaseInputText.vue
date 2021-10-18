<template>
  <input
    :type="type"
    v-bind="$attrs"
    class="
      p-3
      placeholder-gray-500
      bg-white
      text-gray-700
      shadow-sm
      border border-gray-300
      rounded-lg
      outline-none
      focus:ring-2 focus:ring-tertiary-300 focus:outline-none
      w-full
    "
    @input="onInput($event.target.value)"
    v-on="$listeners"
  />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'BaseInputText',

  inheritAttrs: false,

  model: {
    event: 'update',
  },

  props: {
    type: {
      type: String,
      default: 'text',
      // Only allow types that essentially just render text boxes.
      validator: (value: string) => {
        return [
          'email',
          'number',
          'password',
          'search',
          'tel',
          'text',
          'url',
          'hidden',
        ].includes(value)
      },
    },
  },

  emits: {
    update: null,
  },

  setup(props, context) {
    function onInput(newValue: string) {
      context.emit('update', newValue)
    }

    return {
      onInput,
    }
  },
})
</script>
