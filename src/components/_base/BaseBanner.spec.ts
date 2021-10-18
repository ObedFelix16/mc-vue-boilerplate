import BaseBanner from '@/components/_base/BaseBanner.vue'
import { shallowMount } from '@vue/test-utils'

const shallowMountBaseBanner = (options = {}) =>
  shallowMount(BaseBanner, {
    ...options,
  })

describe('@/components/_base/BaseBanner.vue', () => {
  it('exports a valid component', () => {
    const wrapper = shallowMountBaseBanner()
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('supports dynamic component', () => {
    const { element } = shallowMountBaseBanner({
      propsData: {
        tag: 'section',
      },
    })

    expect(element.tagName).toEqual('SECTION')
  })

  it('should render correct contents', () => {
    const slotContent = 'foo'
    const { element } = shallowMountBaseBanner({
      slots: {
        default: slotContent,
      },
    })
    expect(element.innerHTML).toContain(slotContent)
  })
})
