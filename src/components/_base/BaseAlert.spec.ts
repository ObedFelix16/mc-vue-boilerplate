import BaseAlert from '@/components/_base/BaseAlert.vue'
import { shallowMount } from '@vue/test-utils'

const shallowMountBaseAlert = (options = {}) =>
  shallowMount(BaseAlert, {
    ...options,
  })

describe('@/components/_base/BaseAlert.vue', () => {
  it('exports a valid component', () => {
    const wrapper = shallowMountBaseAlert()
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('supports dynamic component', () => {
    const { element } = shallowMountBaseAlert({
      propsData: {
        tag: 'section',
      },
    })

    expect(element.tagName).toEqual('SECTION')
  })

  it('should render correct contents', () => {
    const slotContent = 'foo'
    const { element } = shallowMountBaseAlert({
      slots: {
        default: slotContent,
      },
    })
    expect(element.innerHTML).toContain(slotContent)
  })
})
