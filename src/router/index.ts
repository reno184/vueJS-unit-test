import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import aboutView from '@/views/AboutView.vue'
import usersView from '@/views/user/usersView.vue'
import todoListView from '@/views/todo/todoListView.vue'
import userPost from '@/views/post/userPost.vue'

export const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/users', name: 'users', component: usersView },
  { path: '/todos', name: 'todos', component: todoListView },
  { path: '/about', name: 'about', component: aboutView },
  { path: '/posts/:userId', name: 'userPost', component: userPost }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
