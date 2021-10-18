import BaseBadge from '@/components/_base/BaseBadge.vue'
import { shallowMount } from '@vue/test-utils'

describe('@/components/_base/BaseBadge.vue', () => {
  it('should render correct contents', () => {
    const slotContent = 'foo'
    const { element } = shallowMount(BaseBadge, {
      slots: {
        default: slotContent,
      },
    })
    expect(element.innerHTML).toContain(slotContent)
  })
})
