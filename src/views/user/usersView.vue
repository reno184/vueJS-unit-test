<template>
  <div v-if="userStore.state.loading">loading...</div>
  <template v-else>
    <div v-if="userStore.state.list.length===0">empty...</div>
    <ul v-else style="width: 50%">
      <li v-for="(user, index) in userStore.state.list" :key="index" style="display: flex; border-bottom: solid 1px #aaa;line-height: 2rem;">
        <span style="flex: 1" >{{ user.name }}</span>
        <router-link :to="{ name : 'userPost', params : {userId : user.id}}" style="margin-right: 5px" >posts</router-link>
      </li>
    </ul>
  </template>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import UserView from '@/views/user/userView.vue'
import { IPostStore } from '@/core/features/posts/post.store'
import { PostModel } from '@/core/features/posts/post.model'
import { IUserStore } from '@/core/features/users/user.store'

export default defineComponent({
  name: 'usersView',
  setup () {
    const userStore = inject('UserStore') as IUserStore
    return { userStore }
  },
  created () {
    this.userStore.action.fetch()
  }
})
</script>

<style scoped>

</style>
