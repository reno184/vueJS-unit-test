import { createApp, reactive } from 'vue'
import App from './App.vue'
import router from './router'

export interface GStoreModel {
  blockers : number
}
export const GlobalStore = reactive({ blockers: 0 } as GStoreModel)

createApp(App).use(router).provide('GlobalStore', GlobalStore).mount('#app')
