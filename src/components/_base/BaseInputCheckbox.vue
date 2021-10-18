<template>
  <input
    :checked="isChecked"
    v-bind="$attrs"
    type="checkbox"
    class="
      h-4
      w-4
      text-secondary
      focus:ring-2 focus:ring-secondary-500
      border-gray-300
      rounded
    "
    @change="onChange($event.target.checked)"
    v-on="$listeners"
  />
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'BaseInputCheckbox',

  inheritAttrs: false,

  model: {
    prop: 'modelValue',
    event: 'update',
  },

  props: {
    modelValue: {
      type: [Boolean, String, Array],
      default: false,
    },

    trueValue: {
      type: [Boolean, String],
      default: true,
    },

    falseValue: {
      type: [Boolean, String],
      default: false,
    },
  },

  emits: {
    update: null,
  },

  setup(props, context) {
    const isChecked = computed(() =>
      Array.isArray(props.modelValue)
        ? props.modelValue.includes(context.attrs.value)
        : props.modelValue === props.trueValue
    )

    function onChange(isChecked: boolean) {
      const { modelValue } = props
      let newVal: typeof modelValue
      if (Array.isArray(modelValue)) {
        newVal = [...modelValue]
        if (isChecked) {
          newVal.push(context.attrs.value)
        } else {
          newVal.splice(newVal.indexOf(context.attrs.value), 1)
        }
      } else {
        newVal = isChecked ? props.trueValue : props.falseValue
      }
      context.emit('update', newVal)
    }

    return {
      isChecked,
      onChange,
    }
  },
})
</script>
