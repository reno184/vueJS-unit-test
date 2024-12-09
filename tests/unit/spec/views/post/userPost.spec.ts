import { flushPromises, mount } from '@vue/test-utils'
import userPost from '@/views/post/userPost.vue'
import { routes } from '@/router'
import { createMemoryHistory, createRouter } from 'vue-router'

describe('<user>', function () {
  it('should more than one line into list', async function () {
    const router = createRouter({
      history: createMemoryHistory(), // pour éviter d'utiliser un système de navigateur
      routes: routes
    })
    await router.push('/posts/5')
    await router.isReady()
    const wrapper = mount(userPost, { global: { plugins: [router] }, setup () { return { mocked: true } } })
    await flushPromises()
    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.get('[data-test=mock]').text()).toBe('true')
    expect(wrapper.findAll('li')).toHaveLength(4)
  })
})
