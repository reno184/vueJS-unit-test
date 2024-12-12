import { reactive } from 'vue'
import { TodoModel } from '@/core/features/todos/todo.model'
import { ITodoManager } from '@/core/features/todos/createTodoManager'

interface ITodoState {
  list: TodoModel[]
  initialized: boolean
  loading: boolean
  deleting: boolean
  error: string
}

export interface ITodoStore {
  action: {
    fetch : () => void
    delete: (id: number)=> void
  },
  state : ITodoState
}

export const todoStore = function (todoManager : ITodoManager) {
  const state = reactive({ list: [] as TodoModel[], initialized: false, loading: false, error: '', deleting: false } as ITodoState)
  const mutation = {
    loading: (value: boolean) => {
      state.loading = value
    },
    deleting: (value: boolean) => {
      state.deleting = value
    },
    success: (list: TodoModel[]) => {
      state.list = list
      state.initialized = true
    },
    delete: (id : number) => {
      state.list = state.list.filter(item => item.id !== id)
    },
    error: function (err: string) {
      state.error = err
    }
  }
  const effect = {
    fetch: function () {
      mutation.error('')
      mutation.loading(true)
      todoManager.list().then(list => {
        mutation.success(list)
      }).catch(err => {
        mutation.error(err)
      }).finally(() => {
        mutation.loading(false)
      })
    },
    delete: function (id: number) {
      mutation.error('')
      mutation.deleting(true)
      todoManager.delete(id).then(() => {
        mutation.delete(id)
      }).catch(err => {
        mutation.error(err)
      }).finally(() => {
        mutation.deleting(false)
      })
    }
  }
  return {
    action: {
      fetch: function (): void {
        effect.fetch()
      },
      delete: function (id : number): void {
        effect.delete(id)
      }
    },
    state
  }
}
