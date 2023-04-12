import { reactive } from 'vue'
import { PostModel } from '@/core/features/posts/post.model'
import { IPostManager } from '@/core/features/posts/post.manager'

export interface IPostStore {
  action: {
    fetch : () => void
    delete: (id: number)=> void
  },
  state : {
    list: PostModel[]
    initialized: boolean
    loading: boolean
    deleting: boolean
    error: string
  }
}

export const postStore = function (postManager : IPostManager) {
  const state = reactive({ list: [] as PostModel[], initialized: false, loading: false, error: '', deleting: false })
  const mutation = {
    loading: (value: boolean) => {
      state.loading = value
    },
    deleting: (value: boolean) => {
      state.deleting = value
    },
    success: (list: PostModel[]) => {
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
      postManager.list().then(list => {
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
      postManager.delete(id).then(() => {
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
