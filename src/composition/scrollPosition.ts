import { onMounted, onUnmounted, reactive } from '@vue/composition-api'

export interface ScrollPosition {
  x: number
  y: number
}

export interface UseScrollPositionOptions {
  bindEvents?: boolean
}

export function useScrollPosition(
  { bindEvents }: UseScrollPositionOptions = {
    bindEvents: true,
  }
) {
  const position = reactive<ScrollPosition>({
    x: 0,
    y: 0,
  })

  if (typeof window !== 'undefined') {
    const setScollPosition = () => {
      position.x = window.scrollX
      position.y = window.scrollY
    }

    if (bindEvents) {
      onMounted(() => {
        window.addEventListener('scroll', setScollPosition)
      })

      onUnmounted(() => {
        window.removeEventListener('scroll', setScollPosition)
      })
    }

    setScollPosition()
  }

  return {
    position,
  }
}
