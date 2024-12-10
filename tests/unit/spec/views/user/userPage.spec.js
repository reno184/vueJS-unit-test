import { mount } from '@vue/test-utils'
import usersView from '@/views/user/usersView.vue'
import { createUserStoreMock } from '../../../../core/store/userStore.mock'
import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router'

const _createMount = function (router, loading, empty, error) {
  return mount(usersView, {
    global: {
      plugins: [router],
      provide: {
        UserStore: createUserStoreMock(loading, empty, error)
      }
    }
  })
}
describe('<user page>', function () {
  let router
  let wrapper
  beforeAll(function () {
    router = createRouter({
      history: createMemoryHistory(),
      routes: routes
    })
    wrapper = _createMount(router, true, true)
  })

  it('test user page', function () {
    expect(wrapper.exists()).toBeTruthy()
  })
  it('test if loading', function () {
    expect(wrapper.html()).toContain('loading')
  })
  it('test if not loading', async function () {
    wrapper = _createMount(router, false, true)
    expect(wrapper.html()).not.toContain('loading')
  })
  it('test if list empty', function () {
    wrapper = _createMount(router, false, true)
    expect(wrapper.html()).toContain('empty')
  })
  it('test if list not empty', function () {
    wrapper = _createMount(router, false, false)
    expect(wrapper.html()).toContain('<li')
  })
  it('should call fetch on mounted', function () {
    wrapper = _createMount(router, true, true)
    expect(wrapper.vm.userStore.action.fetch).toHaveBeenCalled()
  })
  it('should have an error', function () {
    wrapper = _createMount(router, true, true, true)
    expect(wrapper.html()).toContain('error')
  })
})
