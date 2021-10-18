import BaseImage from '@/components/_base/BaseImage.vue'
import { mount } from '@vue/test-utils'

const mountBaseImage = (options = {}) => {
  return mount(BaseImage, {
    ...options,
  })
}

describe('@/components/_base/BaseImage.vue', () => {
  const src = '/img.jpg'
  const alt = 'A symbol that identifies the application brand'
  const wrapper = mountBaseImage({
    propsData: {
      src,
      alt,
    },
  })

  it('exports a valid component', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('renders an HTMLImageElement', () => {
    const { element } = wrapper
    expect(element.nodeName).toEqual('IMG')
  })

  it('has a src tag', () => {
    expect(wrapper.attributes().src).toEqual(src)
    expect(wrapper.element.hasAttribute('src')).toBe(true)
    expect(wrapper.element.getAttribute('src')).toEqual(src)
  })

  it('has an alt tag', () => {
    expect(wrapper.attributes().alt).toEqual(alt)
    expect(wrapper.element.hasAttribute('alt')).toBe(true)
    expect(wrapper.element.getAttribute('alt')).toEqual(alt)
  })
})
