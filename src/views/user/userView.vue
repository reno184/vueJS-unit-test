<template>
  <post-view :items="statePost.list" @delete="onDelete(id)"></post-view>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import postView from '@/views/user/postView.vue'
import { IPostStore } from '@/core/features/posts/post.store'

export default defineComponent({
  inject: ['PostStore'],
  components: {
    postView
  },
  computed: {
    statePost () {
      return (this.PostStore as IPostStore).state
    }
  },
  created () {
    (this.PostStore as IPostStore).action.fetch()
  },
  methods: {
    onDelete (id: string) {
      (this.PostStore as IPostStore).action.delete(parseInt(id))
    }
  }
})
</script>

<style scoped>

</style>
