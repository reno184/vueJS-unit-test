
import { IAjaxProvider } from '@/core/services/ajaxProvider'
import { UserModel } from '@/core/features/users/user.model'

export interface IUserManager {
  list: () => Promise<UserModel[]>
}

export const userManager = function (ajaxProvider : IAjaxProvider) {
  return {
    list: async function (): Promise<UserModel[]> {
      return ajaxProvider.list<UserModel[]>('users')
    }
  }
}
