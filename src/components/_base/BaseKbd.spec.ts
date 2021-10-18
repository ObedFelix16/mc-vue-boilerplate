import BaseKbd from '@/components/_base/BaseKbd.vue'
import { mount } from '@vue/test-utils'

describe('@/components/_base/BaseKbd.vue', () => {
  it('exports a valid component', () => {
    const wrapper = mount(BaseKbd)
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
