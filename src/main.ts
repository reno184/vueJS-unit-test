import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { IPostManager, postManager } from '@/core/features/posts/post.manager'
import { AjaxProvider, IAjaxProvider } from '@/core/services/ajaxProvider'
import { IPostStore, postStore } from '@/core/features/posts/post.store'
import { globalStore, IGlobalStore } from '@/core/services/global.store'
import { IUserManager, userManager } from '@/core/features/users/user.manager'
import { ITodoManager, todoManager } from '@/core/features/todos/todo.manager'
import { ITodoStore, todoStore } from '@/core/features/todos/todo.store'
import { IUserStore, userStore } from '@/core/features/users/user.store'

const _globalStore: IGlobalStore = globalStore()
const _ajaxProvider: IAjaxProvider = AjaxProvider(_globalStore)
const _postManager: IPostManager = postManager(_ajaxProvider)
const _userManager: IUserManager = userManager(_ajaxProvider)
const _todoManager: ITodoManager = todoManager(_ajaxProvider)

const _postStore: IPostStore = postStore(_postManager)
const _userStore: IUserStore = userStore(_userManager)
const _todoStore: ITodoStore = todoStore(_todoManager)

createApp(App).use(router)
  .provide('GlobalStore', _globalStore)
  .provide('PostStore', _postStore)
  .provide('UserStore', _userStore)
  .provide('TodoStore', _todoStore)
  .mount('#app')
