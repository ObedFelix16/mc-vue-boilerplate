import BaseLink from '@/components/_base/BaseLink.vue'
import { shallowMount, RouterLinkStub } from '@vue/test-utils'

declare let global: any

const shallowMountBaseLink = (options = {}) => {
  return shallowMount(BaseLink, {
    stubs: {
      RouterLink: RouterLinkStub,
    },
    slots: {
      default: 'hello',
    },
    ...options,
  })
}

describe('@/components/_base/BaseLink.vue', () => {
  const originalConsoleWarn = global.console.warn
  let warning: string | undefined
  beforeEach(() => {
    warning = undefined
    global.console.warn = jest.fn((text) => {
      warning = text
    })
  })
  afterAll(() => {
    global.console.warn = originalConsoleWarn
  })

  it('exports a valid component', () => {
    const wrapper = shallowMountBaseLink()
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('warns about an invalid href', () => {
    shallowMountBaseLink({
      propsData: {
        href: '/some/local/path',
      },
    })
    expect(console.warn).toHaveBeenCalledTimes(1)
    expect(warning).toMatch(/Invalid <BaseLink> href/)
  })

  it('warns about an insecure href', () => {
    shallowMountBaseLink({
      propsData: {
        href: 'http://google.com',
      },
    })
    expect(console.warn).toHaveBeenCalledTimes(1)
    expect(warning).toMatch(/Insecure <BaseLink> href/)
  })

  it('renders an anchor element when passed an `href` prop', () => {
    const externalUrl = 'https://google.com/'
    const wrapper = shallowMountBaseLink({
      propsData: {
        href: externalUrl,
      },
    })
    const element = wrapper.element as HTMLAnchorElement
    expect(console.warn).not.toHaveBeenCalled()
    expect(element.nodeName).toEqual('A')
    expect(element.href).toEqual(externalUrl)
    expect(element.target).toEqual('_blank')
    expect(element.textContent).toEqual('hello')
  })

  it('renders a RouterLink when passed a `name` prop', () => {
    const routeName = 'home'
    const wrapper = shallowMountBaseLink({
      propsData: {
        name: routeName,
      },
    })
    expect(console.warn).not.toHaveBeenCalled()
    expect(wrapper.find(RouterLinkStub).props().to.name).toBe(routeName)
  })

  it('renders a RouterLink when passed `name` and `params` props', () => {
    const routeName = 'home'
    const routeParams = { foo: 'bar' }
    const wrapper = shallowMountBaseLink({
      propsData: {
        name: routeName,
        params: routeParams,
      },
    })
    expect(console.warn).not.toHaveBeenCalled()
    expect(wrapper.find(RouterLinkStub).props().to.name).toBe(routeName)
    expect(wrapper.find(RouterLinkStub).props().to.params).toEqual(routeParams)
  })

  it('renders a RouterLink when passed a `to` prop', () => {
    const routeName = 'home'
    const wrapper = shallowMountBaseLink({
      propsData: {
        to: {
          name: routeName,
        },
      },
    })
    expect(console.warn).not.toHaveBeenCalled()
    expect(wrapper.find(RouterLinkStub).props().to.name).toBe(routeName)
  })

  it('renders a RouterLink when passed a `to` prop with `params`', () => {
    const routeName = 'home'
    const routeParams = { foo: 'bar' }
    const wrapper = shallowMountBaseLink({
      propsData: {
        to: {
          name: routeName,
          params: routeParams,
        },
      },
    })
    expect(console.warn).not.toHaveBeenCalled()
    expect(wrapper.find(RouterLinkStub).props().to.name).toBe(routeName)
    expect(wrapper.find(RouterLinkStub).props().to.params).toEqual(routeParams)
  })
})
