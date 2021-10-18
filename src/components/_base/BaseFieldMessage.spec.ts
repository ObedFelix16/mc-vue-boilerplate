import BaseFieldMessage from '@/components/_base/BaseFieldMessage.vue'
import { mount } from '@vue/test-utils'

describe('@/components/_base/BaseFieldMessage.vue', () => {
  it('exports a valid component', () => {
    const wrapper = mount(BaseFieldMessage)
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
