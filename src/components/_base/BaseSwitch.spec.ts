import BaseSwitch from '@/components/_base/BaseSwitch.vue'
import { mount } from '@vue/test-utils'

const mountBaseSwitch = (options = {}) => {
  return mount(BaseSwitch, {
    ...options,
  })
}

describe('@/components/_base/BaseSwitch.vue', () => {
  it('is v-model compatible', () => {
    const wrapper = mountBaseSwitch({
      propsData: {
        value: false,
      },
    })

    // Emits an update event with the correct value when the component is clicked
    wrapper.trigger('click')

    // Emits an update event with the correct value when the space bar key is used
    wrapper.trigger('keydown.space')

    // Make sure an update event is not fired when disabled prop is true
    wrapper.setProps({ disabled: true })
    wrapper.trigger('click')
    wrapper.trigger('keydown.space')

    // Make sure an update event is not fired when readonly prop is true
    wrapper.setProps({ disabled: false, readonly: true })
    wrapper.trigger('click')
    wrapper.trigger('keydown.space')

    // Make sure the update event was called only twice
    expect(wrapper.emitted().update).toEqual([[true], [true]])
  })

  it('has the correct accessibility attributes', async () => {
    const wrapper = mountBaseSwitch({
      propsData: {
        value: false,
      },
    })

    // Has the correct starting aria value
    expect(wrapper.attributes()['aria-checked']).toBe('false')

    // Has the correct aria value when props change
    wrapper.setProps({ value: true })
    // Make sure Vue has updated the DOM
    await wrapper.vm.$nextTick()
    expect(wrapper.attributes()['aria-checked']).toBe('true')
  })
})
