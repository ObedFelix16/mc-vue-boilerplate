import BaseField from '@/components/_base/BaseField.vue'
import { mount } from '@vue/test-utils'

describe('@/components/_base/BaseField.vue', () => {
  it('exports a valid component', () => {
    const wrapper = mount(BaseField)
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
