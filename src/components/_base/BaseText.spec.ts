import BaseText from '@/components/_base/BaseText.vue'
import { mount } from '@vue/test-utils'

describe('@/components/_base/BaseText.vue', () => {
  it('exports a valid component', () => {
    const wrapper = mount(BaseText)
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
