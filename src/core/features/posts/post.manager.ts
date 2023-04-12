import { PostModel } from '@/core/features/posts/post.model'
import { IAjaxProvider } from '@/core/services/ajaxProvider'

export interface IPostManager {
  list: () => Promise<PostModel[]>
  delete: (id:number) => Promise<void>
}

export const postManager = function (ajaxProvider : IAjaxProvider) {
  return {
    list: async function (): Promise<PostModel[]> {
      return ajaxProvider.list<PostModel[]>('posts')
    },
    delete: async function (id:number): Promise<void> {
      return ajaxProvider.delete('posts', id)
    }
  }
}
