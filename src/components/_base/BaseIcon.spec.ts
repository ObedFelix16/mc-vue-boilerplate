import BaseIcon from '@/components/_base/BaseIcon.vue'
import { mount } from '@vue/test-utils'

describe('@/components/_base/BaseIcon.vue', () => {
  it('should render a font-awesome icon', () => {
    const { element } = mount(BaseIcon, {
      propsData: {
        name: 'sync',
      },
    })

    expect(element.tagName).toEqual('svg')
    expect(element.classList).toContain('svg-inline--fa')
    expect(element.classList).toContain('fa-sync')
    expect(element.classList).toContain('fa-w-16')
  })

  it('should render a custom icon', () => {
    const name = 'some-icon'
    const { element } = mount(BaseIcon, {
      propsData: {
        source: 'custom',
        name,
      },
    })

    expect(element.tagName).toEqual('SPAN')
    expect(element.classList).toContain('BaseIcon--custom')
  })
})
