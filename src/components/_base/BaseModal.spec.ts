import BaseModal from '@/components/_base/BaseModal.vue'
import { mount } from '@vue/test-utils'

const mountBaseModal = (options = {}) =>
  mount(BaseModal, {
    ...options,
  })

describe('@/components/_base/BaseListItem.vue', () => {
  it('exports a valid component', () => {
    const wrapper = mountBaseModal()
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('is v-model compatible', async () => {
    const wrapper = mountBaseModal({
      propsData: {
        modelValue: false,
      },
    })

    // It should be hidden and not render anything
    expect(wrapper.element.innerHTML).toBeUndefined()

    wrapper.setProps({ modelValue: true })

    await wrapper.vm.$nextTick()

    // It should show and render content
    expect(wrapper.element.innerHTML).toBeDefined()
  })

  it('should render correct contents', () => {
    const slotContent = '<span>foo</span>'
    const wrapper = mountBaseModal({
      propsData: {
        modelValue: true,
      },
      slots: {
        default: slotContent,
      },
    })
    expect(wrapper.element.innerHTML).toContain(slotContent)
  })

  it('should not render any contents', () => {
    const slotContent = '<span>foo</span>'
    const wrapper = mountBaseModal({
      propsData: {
        modelValue: false,
      },
      slots: {
        default: slotContent,
      },
    })
    expect(wrapper.element.innerHTML).toBeUndefined()
  })
})
