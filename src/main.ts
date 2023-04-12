import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { IPostManager, postManager } from '@/core/features/post/post.manager'
import { AjaxProvider, IAjaxProvider } from '@/core/services/ajaxProvider'
import { IPostStore, postStore } from '@/core/features/post/post.store'
import { globalStore, IGlobalStore } from '@/core/services/global.store'

const _globalStore: IGlobalStore = globalStore()
const _ajaxProvider: IAjaxProvider = AjaxProvider(_globalStore)
const _postManager: IPostManager = postManager(_ajaxProvider)
const _postStore: IPostStore = postStore(_postManager)

createApp(App).use(router)
  .provide('GlobalStore', _globalStore)
  .provide('PostStore', _postStore)
  .mount('#app')
