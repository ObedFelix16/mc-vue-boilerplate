<template>
  <Portal :to="to">
    <BaseBox v-if="modelValue" class="fixed inset-0 z-40 h-screen">
      <BaseBox
        :aria-label="ariaLabel"
        role="dialog"
        class="
          relative
          flex
          justify-center
          items-end
          sm:items-center
          h-full
          lg:py-12
          xl:py-20
        "
      >
        <BaseLink
          class="
            bg-gray-900 bg-opacity-50
            absolute
            inset-0
            w-full
            h-full
            cursor-default
          "
          @click="onBackdropClick"
        />
        <BaseBox class="relative max-w-screen-md w-full max-h-full">
          <BaseBox
            tag="section"
            class="bg-white flex flex-col h-full lg:shadow rounded-xl"
          >
            <BaseBox
              tag="header"
              class="
                p-6
                border-b border-gray-200
                grid
                gap-4
                sm:grid-cols-1 sm:grid-rows-1
                items-center
              "
            >
              <BaseBox class="sm:col-start-1 sm:row-start-1">
                <BaseHeading :level="2" class="font-semibold text-center">
                  <slot :close="close" name="header" />
                </BaseHeading>
              </BaseBox>
              <BaseBox class="sm:col-start-1 sm:row-start-1 w-1/6 sm:w-auto">
                <BaseButton variant="transparent" @click="close">
                  <BaseIcon name="close-small" source="custom" />
                </BaseButton>
              </BaseBox>
            </BaseBox>
            <BaseBox class="h-full overflow-auto py-2 px-4 lg:px-12">
              <slot :close="close" />
            </BaseBox>
            <BaseBox
              tag="footer"
              class="
                py-4
                px-6
                border-t border-gray-200
                flex flex-col
                space-y-4
                lg:flex-row lg:space-y-0 lg:space-x-4 lg:justify-between
              "
            >
              <slot :close="close" name="footer" />
            </BaseBox>
          </BaseBox>
        </BaseBox>
      </BaseBox>
    </BaseBox>
  </Portal>
</template>

<script lang="ts">
import { scrollLock } from '@/composition/scrollLock'
import { useWindowKeyboardListener } from '@/composition/windowKeyboardListener'
import {
  defineComponent,
  onMounted,
  onUnmounted,
  watch,
} from '@vue/composition-api'

export default defineComponent({
  name: 'BaseModal',

  model: {
    prop: 'modelValue',
    event: 'update',
  },

  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },

    ariaLabel: {
      type: String,
      required: true,
    },

    to: {
      type: String,
      default: 'modal-container',
    },

    scrollLock: {
      type: Boolean,
      default: true,
    },

    closeOnBackdropClick: {
      type: Boolean,
      default: true,
    },

    closeWithEscapeKey: {
      type: Boolean,
      default: true,
    },
  },

  emits: {
    update: null,
  },

  setup(props, context) {
    onMounted(() => {
      if (props.scrollLock) {
        watch(
          () => props.modelValue,
          (newValue) => {
            if (newValue) {
              scrollLock.enable()
            } else {
              scrollLock.disable()
            }
          },
          {
            immediate: true,
          }
        )
      }
    })

    onUnmounted(() => {
      if (props.scrollLock && scrollLock.isLocked.value) {
        scrollLock.disable()
      }
    })

    if (props.closeWithEscapeKey) {
      useWindowKeyboardListener({
        key: 'Escape',
        handler: (evt) => {
          if (
            evt &&
            evt.target &&
            ['INPUT', 'TEXTAREA'].includes((evt.target as HTMLElement).nodeName)
          )
            return

          close()
        },
      })
    }

    function onBackdropClick() {
      if (!props.closeOnBackdropClick) return
      close()
    }

    function close() {
      context.emit('update', false)
    }

    return {
      onBackdropClick,
      close,
    }
  },
})
</script>
