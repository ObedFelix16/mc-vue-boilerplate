import BaseTextarea from '@/components/_base/BaseTextarea.vue'
import { mount } from '@vue/test-utils'

describe('@/components/_base/BaseTextarea.vue', () => {
  it('exports a valid component', () => {
    const wrapper = mount(BaseTextarea)
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
