import BaseListItem from '@/components/_base/BaseListItem.vue'
import { mount } from '@vue/test-utils'

const mountBaseListItem = (options = {}) =>
  mount(BaseListItem, {
    ...options,
  })

describe('@/components/_base/BaseListItem.vue', () => {
  it('exports a valid component', () => {
    const wrapper = mountBaseListItem()
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('should render correct contents', () => {
    const slotContent = 'hello'
    const { element } = mountBaseListItem({
      slots: {
        default: slotContent,
      },
    })
    expect(element.innerHTML).toContain(slotContent)
  })
})
