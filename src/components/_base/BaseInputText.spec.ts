import BaseInputText from '@/components/_base/BaseInputText.vue'
import { mount } from '@vue/test-utils'

describe('@/components/_base/BaseInputText.vue', () => {
  it('is v-model compatible', async () => {
    const wrapper = mount(BaseInputText, {
      propsData: {
        value: 'aaa',
      },
    })

    const inputEl = wrapper.find('input').element as HTMLInputElement

    // Has the correct starting value
    expect(inputEl.value).toEqual('aaa')

    // Emits an update event with the correct value when edited
    inputEl.value = 'bbb'
    wrapper.trigger('input')
    expect(wrapper.emitted().update).toEqual([['bbb']])

    // Sets the input to the correct value when props change
    wrapper.setValue('ccc')
    await wrapper.vm.$nextTick()
    expect(inputEl.value).toEqual('ccc')
  })

  it('allows a type of "password"', () => {
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {})
    mount(BaseInputText, {
      propsData: { value: 'aaa', type: 'password' },
    })
    expect(consoleError).not.toBeCalled()
    consoleError.mockRestore()
  })

  it('does NOT allow a type of "checkbox"', () => {
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {})
    mount(BaseInputText, {
      propsData: { value: 'aaa', type: 'checkbox' },
    })
    expect(consoleError.mock.calls[0][0]).toContain(
      'custom validator check failed for prop "type"'
    )
    consoleError.mockRestore()
  })
})
