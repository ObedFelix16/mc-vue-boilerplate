import BaseSelect from '@/components/_base/BaseSelect.vue'
import Multiselect from 'vue-multiselect'
import { shallowMount } from '@vue/test-utils'

const shallowMountBaseSelect = (options = {}) =>
  shallowMount(BaseSelect, {
    ...options,
    stubs: {
      Multiselect,
    },
  })

describe('@/components/_base/BaseSelect.vue', () => {
  it('exports a valid component', () => {
    const wrapper = shallowMountBaseSelect({
      propsData: {
        options: [],
      },
    })
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
