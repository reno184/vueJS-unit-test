import { IUserManager } from '@/core/features/users/user.manager'
import { reactive } from 'vue'
import { UserModel } from '@/core/features/users/user.model'

export interface IUserStore {
  action: {
    fetch : () => void
  },
  state : {
    list: UserModel[]
    initialized: boolean
    loading: boolean
    error: string
  }
}

export const userStore = function (userManager : IUserManager) {
  const state = reactive({ list: [] as UserModel[], initialized: false, loading: false, error: '' })
  const mutation = {
    loading: (value: boolean) => {
      state.loading = value
    },
    success: (list: UserModel[]) => {
      state.list = list
      state.initialized = true
    },
    error: function (err: string) {
      state.error = err
    }
  }
  const effect = {
    fetch: function () {
      mutation.error('')
      mutation.loading(true)
      userManager.list().then(list => {
        mutation.success(list)
      }).catch(err => {
        mutation.error(err)
      }).finally(() => {
        mutation.loading(false)
      })
    }
  }
  return {
    action: {
      fetch: function (): void {
        effect.fetch()
      }
    },
    state
  }
}
