import BaseDate from '@/components/_base/BaseDate.vue'
import { mount } from '@vue/test-utils'

describe('@/components/_base/BaseDate.vue', () => {
  it('exports a valid component', () => {
    const wrapper = mount(BaseDate, {
      propsData: {
        date: new Date(),
      },
    })
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
