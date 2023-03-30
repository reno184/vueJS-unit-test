import comp from '@/views/HomeView.vue'
import { mount } from '@vue/test-utils'

describe('HomeView component', () => {
  const wrapper = mount(comp)

  it('test computed properties', () => {
    const firstName = 'Yoo'
    wrapper.setData({ firstName })
    expect(wrapper.vm.hello).toBe('hello ' + firstName)
  })
})
