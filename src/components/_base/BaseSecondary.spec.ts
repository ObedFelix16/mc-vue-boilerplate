import BaseSecondary from '@/components/_base/BaseSecondary.vue'
import { mount } from '@vue/test-utils'

describe('@/components/_base/BaseSecondary.vue', () => {
  it('exports a valid component', () => {
    const wrapper = mount(BaseSecondary)
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
