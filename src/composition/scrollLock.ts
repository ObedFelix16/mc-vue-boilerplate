import { onMounted, onUnmounted, ref } from '@vue/composition-api'

export const scrollLock = useScrollLock()

export interface UseScrollLockOptions {
  withLifecycleHooks?: boolean
}

export function useScrollLock(
  { withLifecycleHooks }: UseScrollLockOptions = {
    withLifecycleHooks: false,
  }
) {
  const isLocked = ref(false)
  const body = document.querySelector('body')

  if (withLifecycleHooks) {
    onMounted(() => {
      enable()
    })

    onUnmounted(() => {
      disable()
    })
  }

  function enable() {
    if (!body || isLocked.value) return
    body.style.overflow = 'hidden'
    isLocked.value = true
  }

  function disable() {
    if (!body || !isLocked.value) return
    body.style.removeProperty('overflow')
    isLocked.value = false
  }

  return {
    isLocked,
    enable,
    disable,
  }
}
