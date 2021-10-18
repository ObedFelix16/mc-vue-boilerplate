import BaseSegmentedControl from '@/components/_base/BaseSegmentedControl.vue'
import { mount } from '@vue/test-utils'

describe('@/components/_base/BaseSegmentedControl.vue', () => {
  it('exports a valid component', () => {
    const wrapper = mount(BaseSegmentedControl)
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
