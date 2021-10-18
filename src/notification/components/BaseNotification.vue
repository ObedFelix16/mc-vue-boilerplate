<template>
  <BaseBox class="md:grid justify-end" :style="notification.styles">
    <BaseBox
      class="
        md:max-w-xs
        lg:max-w-sm
        md:rounded-xl
        bg-white
        dark:bg-gray-800
        text-gray-700
        dark:text-gray-200
        shadow-md
      "
    >
      <BaseBox class="flex space-6 items-center">
        <BaseBox v-if="notification.icon" class="m-4 text-xl">
          <slot name="icon" :notification="notification">
            <BaseIcon :name="notification.icon" :tone="iconTone" />
          </slot>
        </BaseBox>
        <BaseBox class="py-4 flex-grow">
          <BaseText v-if="notification.title" tag="p">
            <slot name="title" :notification="notification">
              <BaseStrong>
                {{ notification.title }}
              </BaseStrong>
            </slot>
          </BaseText>
          <BaseText tag="p">
            <slot name="message" :notification="notification">
              {{ notification.message }}
            </slot>
          </BaseText>
        </BaseBox>
        <BaseLink
          class="block cursor-pointer m-4 hover:opacity-50"
          @click="$emit('close')"
        >
          <BaseIcon name="times" tone="neutral" />
        </BaseLink>
      </BaseBox>
    </BaseBox>
  </BaseBox>
</template>

<script lang="ts">
import { CommuniqueNotification } from 'vue-communique'
import { computed, defineComponent, PropType } from '@vue/composition-api'

export default defineComponent({
  name: 'BaseNotification',

  inheritAttrs: false,

  props: {
    notification: {
      type: Object as PropType<CommuniqueNotification>,
      required: true,
    },
  },

  setup(props) {
    const iconTone = computed(() => props.notification.$attrs?.tone)

    return {
      iconTone,
    }
  },
})
</script>
