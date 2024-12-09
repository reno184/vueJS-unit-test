import { mount } from '@vue/test-utils'
import comp from '@/views/todo/todoListView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router'

describe('Todo component', () => {
  const router = createRouter({
    history: createWebHistory(), // pour éviter d'utiliser un système de navigateur
    routes: routes
  })

  const $temp = function (loading: boolean) {
    return {
      global: {
        plugins: [router],
        provide: {
          TodoStore: {
            state: {
              loading
            },
            action: {
              fetch: jest.fn(() => Promise.resolve({
                json: () => Promise.resolve()
              })),
              delete: jest.fn(() => Promise.resolve({
                json: () => Promise.resolve()
              }))
            }
          }
        }
      }
    }
  }

  const wrapper = mount(comp, $temp(false))

  test('if component exist', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('(task) if button add exist', () => {
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('Fetch has been called on created', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect((wrapper.vm.TodoStore.action.fetch)).toHaveBeenCalledTimes(1)
  })

  test('if store loading, do show loading panel', () => {
    const wrapper = mount(comp, $temp(true))
    expect(wrapper.find('[data-test="loading"]').exists()).toBe(true)
  })
  test('if store NOT loading, do NOT show loading panel', () => {
    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false)
  })

  describe('List todos', () => {
    test('test if list is empty', () => {

      // ...
    })
    test('test if list is message error', () => {
      // ...
    })
    test('test if list with records', () => {
      // ...
    })
  })
})
