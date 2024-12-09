import comp from '@/views/AboutView.vue'
import { mount, shallowMount } from '@vue/test-utils'
import VueRouter from 'vue-router'

// https://www.digitalocean.com/community/tutorials/vuejs-vue-testing
describe('AboutView component', () => {
  const mockRoute = {
    params: {
      id: 1
    }
  }
  const mockRouter = {
    push: jest.fn()
  }

  const wrapper = mount(comp, {
    shallow: true,
    stubs: ['router-link', 'router-view'],
    global: {
      mocks: {
        $route: mockRoute,
        $router: mockRouter
      }
    }
  })
  test('allows authenticated user to edit a post', async () => {
    await wrapper.find('button').trigger('click')

    expect(mockRouter.push).toHaveBeenCalledTimes(1)
    expect(mockRouter.push).toHaveBeenCalledWith('/posts/1/edit')
  })
  test('sanitize test', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('renders the correct markup', () => {
    expect(wrapper.html()).toContain('Check Answer')
  })

  it('has a button', () => {
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('renders correctly with different data', async () => {
    wrapper.setData({ x1: 5, x2: 10 })
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('15')
  })

  it('button click without correct sum', () => {
    expect(wrapper.vm.message).toBe('')
    const button = wrapper.find('button')
    button.trigger('click')
    expect(wrapper.vm.message).toBe('TRY AGAIN')
  })

  it('button click with correct sum', () => {
    wrapper.setData({ x1: 5, x2: 10, guess: '15' })
    const button = wrapper.find('button')
    button.trigger('click')
    expect(wrapper.vm.message).toBe('SUCCESS!')
  })

  /*  test('should have a created hook', () => {
    const wrapper = mount(comp) // mounting the component
    expect(typeof wrapper.mounted).toBe('function')
  }) */

  // https://v1.test-utils.vuejs.org/api/wrapper/#attributes
  // test default value
  it('Check attribute id', () => {
    const wrapper = shallowMount(comp)
    expect(wrapper.props('id')).toBe('foo')
  })

  // https://v1.test-utils.vuejs.org/api/wrapper/#classes
  // test contains class at component root
  it('Check root class from ', () => {
    const wrapper = shallowMount(comp)
    expect(wrapper.classes()).toContain('about')
  })
})
