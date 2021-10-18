import { inBrowser } from '@/utils/dom'
import { onMounted, onUnmounted } from '@vue/composition-api'

const keyboardEventNames = ['keydown', 'keypress', 'keyup'] as const
type KeyboardEventName = typeof keyboardEventNames[number]

const keyboardModifiers = ['altKey', 'metaKey', 'ctrlKey', 'shiftKey'] as const
type KeyboardModifier = typeof keyboardModifiers[number]

interface WindowKeyboardListenerOptions {
  keyEvent?: KeyboardEventName
  key: string
  modifiers?: KeyboardModifier[]
  preventDefault?: boolean
  handler: (event?: KeyboardEvent) => void
}

export function useWindowKeyboardListener({
  keyEvent = 'keyup',
  key,
  modifiers = [],
  preventDefault = false,
  handler,
}: WindowKeyboardListenerOptions) {
  if (!inBrowser) return

  const wrappedHandler = (event: KeyboardEvent) => {
    if (event.key !== key || !modifiers.every((modifier) => event[modifier]))
      return

    if (preventDefault) event.preventDefault()

    handler(event)
  }

  onMounted(() => {
    window.addEventListener(keyEvent, wrappedHandler)
  })

  onUnmounted(() => {
    window.removeEventListener(keyEvent, wrappedHandler)
  })
}
