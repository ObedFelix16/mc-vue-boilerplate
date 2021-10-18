import BaseInputCheckbox from '@/components/_base/BaseInputCheckbox.vue'
import { mount } from '@vue/test-utils'

describe('@/components/_base/BaseInputCheckbox.vue', () => {
  it('is v-model compatible', async () => {
    const wrapper = mount(BaseInputCheckbox, {
      propsData: { modelValue: true },
    })
    const inputWrapper = wrapper.find('input')
    const inputEl = inputWrapper.element as HTMLInputElement

    // Has the correct starting value
    expect(inputEl.checked).toEqual(true)

    // // Sets the input to the correct value when props change
    await wrapper.setProps({ modelValue: false })
    expect(inputEl.checked).toEqual(false)

    // Emits an update event with the correct value when edited
    await inputWrapper.setChecked(true)
    expect(wrapper.emitted().update).toEqual([[true]])

    // Has the correct value when using true-value and false-value attributes as the model value
    await wrapper.setProps({
      modelValue: 'yes',
      trueValue: 'yes',
      falseValue: 'no',
      value: undefined,
    })
    expect(inputEl.checked).toEqual(true)
    await wrapper.setProps({ modelValue: 'no' })
    expect(inputEl.checked).toEqual(false)

    // Emits an update event with the correct value when edited
    await inputWrapper.setChecked(true)
    expect((wrapper.emitted().update as unknown[][])[1]).toEqual(['yes'])

    // Has the correct value when using an array as the model value
    await wrapper.setProps({ modelValue: ['aaa'], value: 'aaa' })
    expect(inputEl.checked).toEqual(true)
    await wrapper.setProps({ modelValue: [] })
    expect(inputEl.checked).toEqual(false)

    // Emits an update event with the correct value when edited
    await inputWrapper.setChecked(true)
    expect((wrapper.emitted().update as unknown[][])[2]).toEqual([['aaa']])
  })

  it('is group compatible', async () => {
    let modelValue: string[] = []
    const values = ['beep', 'bop', 'boop']

    for (const value of values) {
      const wrapper = mount(BaseInputCheckbox, {
        propsData: { modelValue, value },
      })
      const inputWrapper = wrapper.find('input')
      await inputWrapper.setChecked(true)
      modelValue = (wrapper.emitted().update as unknown[][])[0][0] as string[]
    }

    expect(modelValue).toEqual(values)
  })
})
