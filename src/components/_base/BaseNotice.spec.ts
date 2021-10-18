import BaseNotice from '@/components/_base/BaseNotice.vue'
import { mount } from '@vue/test-utils'

describe('@/components/_base/BaseNotice.vue', () => {
  it('exports a valid component', () => {
    const wrapper = mount(BaseNotice)
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
