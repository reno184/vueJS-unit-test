<template>
  <div v-if="loading">loading...</div>
  <template v-else>
    <div v-for="user in stateUser.list" :key="user.id" style="width: 50%">
      <user-view :user="user" :posts="userPost(statePost.list, user.id)"  @delete="id => onDelete(id)"></user-view>
    </div>
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UserView from '@/views/user/userView.vue'
import { IPostStore } from '@/core/features/posts/post.store'
import { PostModel } from '@/core/features/posts/post.model'
import { IUserStore } from '@/core/features/users/user.store'

export default defineComponent({
  inject: ['UserStore', 'PostStore'],
  components: {
    UserView
  },
  computed: {
    stateUser () {
      return (this.UserStore as IUserStore).state
    },
    statePost () {
      return (this.PostStore as IPostStore).state
    },
    loading () {
      return this.statePost.loading && this.stateUser.loading
    }
  },
  created () {
    (this.UserStore as IUserStore).action.fetch();
    (this.PostStore as IPostStore).action.fetch()
  },
  methods: {
    userPost (posts : PostModel[], id : number) {
      return posts.filter(post => post.userId === id)
    },
    onDelete (id: string) {
      (this.PostStore as IPostStore).action.delete(parseInt(id))
    }
  }
})
</script>

<style scoped>

</style>
