import BaseHeading from '@/components/_base/BaseHeading.vue'
import { shallowMount } from '@vue/test-utils'

const shallowMountBaseHeading = (options = {}) => {
  return shallowMount(BaseHeading, {
    ...options,
  })
}

describe('@/components/_base/BaseHeading.vue', () => {
  it('exports a valid component', () => {
    const wrapper = shallowMountBaseHeading({
      propsData: {
        level: 1,
      },
    })
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('renders the proper heading tag for each level', async () => {
    const levels: number[] = [1, 2, 3, 4, 5, 6]

    const wrapper = shallowMountBaseHeading({
      propsData: {
        level: 1,
      },
    })
    expect(wrapper.element.tagName).toEqual('H1')

    const [, ...levelsLeft] = levels

    for (let index = 0; index < levelsLeft.length; index++) {
      const level = levelsLeft[index]

      wrapper.setProps({
        level,
      })

      await wrapper.vm.$nextTick()

      expect(wrapper.element.tagName).toEqual(`H${level}`)
    }
  })

  it('should render correct contents', () => {
    const slotContent = '<span>foo</span>'
    const { element } = shallowMountBaseHeading({
      propsData: {
        level: 1,
      },
      slots: {
        default: slotContent,
      },
    })
    expect(element.innerHTML).toContain(slotContent)
  })
})
