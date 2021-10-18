import BaseFieldLabel from '@/components/_base/BaseFieldLabel.vue'
import { mount } from '@vue/test-utils'

describe('@/components/_base/BaseFieldLabel.vue', () => {
  it('exports a valid component', () => {
    const wrapper = mount(BaseFieldLabel)
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
