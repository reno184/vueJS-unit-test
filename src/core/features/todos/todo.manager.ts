
import { IAjaxProvider } from '@/core/services/ajaxProvider'
import { TodoModel } from '@/core/features/todos/todo.model'

export interface ITodoManager {
  list: () => Promise<TodoModel[]>
  delete: (id:number) => Promise<void>
}

export const todoManager = function (ajaxProvider : IAjaxProvider) {
  return {
    list: async function (): Promise<TodoModel[]> {
      return ajaxProvider.list<TodoModel[]>('todos')
    },
    delete: async function (id:number): Promise<void> {
      return ajaxProvider.delete('todos', id)
    }
  }
}
