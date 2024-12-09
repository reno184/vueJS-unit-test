import comp from '@/App.vue'
import About from '@/views/AboutView.vue'
import { mount, RouterLinkStub } from '@vue/test-utils'
import {
  createMemoryHistory,
  createRouter,
  createWebHistory,
  Router
} from 'vue-router'
import { routes } from '@/router'
import flushPromises from 'flush-promises'
import { nextTick } from 'vue'

describe('<app>', () => {
  test('menu toto, exist, available link', async () => {
    const router = createRouter({
      history: createWebHistory(), // pour éviter d'utiliser un système de navigateur
      routes: routes
    })
    await router.push('/')
    await router.isReady()

    const wrapper = mount(comp, {
      global: {
        plugins: [router]
      }
    })
    await router.push('/about')
    await router.isReady()
    expect(wrapper.findComponent(About).exists()).toBeTruthy()
    expect(wrapper.html()).toMatchInlineSnapshot()
  })
})
describe('AboutView component', () => {
  test('tr', async () => {
    const router = createRouter({
      history: createWebHistory(), // pour éviter d'utiliser un système de navigateur
      routes: routes
    })
    await router.push('/')
    await router.isReady()
    const wrapper = mount(comp, {
      shallow: true,
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        },
        plugins: [router as Router]
      }
    })
    await wrapper.find('[aria-label="todoList"]').trigger('click')
    await router.push('/todos')
    await router.isReady()
    await wrapper.vm.$nextTick()

    //
    //  await router.isReady()
    //   await wrapper.vm.$nextTick()

    //  expect(wrapper.findComponent(HomeView).exists()).toBe(true)
    //  expect(_t.exists()).toBeTruthy()
  })
})
