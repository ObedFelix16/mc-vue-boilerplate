import BaseList from '@/components/_base/BaseList.vue'
import { shallowMount } from '@vue/test-utils'

const shallowMountBaseList = (options = {}) => {
  return shallowMount(BaseList, {
    ...options,
  })
}

describe('@/components/_base/BaseList.vue', () => {
  it('exports a valid component', () => {
    const wrapper = shallowMountBaseList({
      propsData: {
        tag: 'ul',
      },
    })
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('renders an HTMLOListElement', () => {
    const { element } = shallowMountBaseList({
      propsData: {
        tag: 'ol',
      },
    })
    expect(element.nodeName).toEqual('OL')
  })

  it('renders an HTMLUListElement', () => {
    const { element } = shallowMountBaseList({
      propsData: {
        tag: 'ul',
      },
    })
    expect(element.nodeName).toEqual('UL')
  })
})
