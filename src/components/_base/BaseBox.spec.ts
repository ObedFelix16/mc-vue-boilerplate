import BaseBox from '@/components/_base/BaseBox.vue'
import { mount } from '@vue/test-utils'

describe('@/components/_base/BaseBox.vue', () => {
  it('exports a valid component', () => {
    const wrapper = mount(BaseBox)
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
