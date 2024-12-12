
import { TodoModel } from '@/core/features/todos/todo.model'
import { IAxiosProvider } from '@/core/provider/axiosProvider'

export interface ITodoManager {
  list: () => Promise<TodoModel[]>
  delete: (id:number) => Promise<void>
}

export const CreateTodoManager = function (axiosProvider : IAxiosProvider) {
  return {
    list: async function (): Promise<TodoModel[]> {
      return axiosProvider.fetch<TodoModel[]>('todos')
    },
    delete: async function (id:number): Promise<void> {
      return axiosProvider.delete('todos', id)
    }
  }
}
