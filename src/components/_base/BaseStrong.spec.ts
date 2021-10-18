import BaseStrong from '@/components/_base/BaseStrong.vue'
import { mount } from '@vue/test-utils'

describe('@/components/_base/BaseStrong.vue', () => {
  it('exports a valid component', () => {
    const wrapper = mount(BaseStrong)
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
