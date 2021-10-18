import BaseButton from '@/components/_base/BaseButton.vue'
import { shallowMount } from '@vue/test-utils'

const shallowMountButton = (options = {}) =>
  shallowMount(BaseButton, {
    ...options,
  })

describe('@/components/_base/BaseButton.vue', () => {
  it('should render correct contents', () => {
    const slotContent = 'foo'
    const { element } = shallowMountButton({
      slots: {
        default: slotContent,
      },
    })
    expect(element.innerHTML).toContain(slotContent)
  })

  it('should use the weight prop in a class name', () => {
    const weight = 'regular'
    const { element } = shallowMountButton({
      propsData: {
        weight,
      },
      slots: {
        default: 'bar',
      },
    })
    expect(element.className.includes(weight)).toBe(true)
  })
})
