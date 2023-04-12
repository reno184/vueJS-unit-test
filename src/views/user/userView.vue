<template>
  <strong>{{user.name}}</strong>
  <ul>
    <li v-for="item in posts" :key="item.id" style="display: flex; border-bottom: solid 1px #aaa;line-height: 2rem;">
      <span style="flex: 1" >{{ item.title }}</span><a href="#" title="delete" @click.prevent="$emit('delete', item.id)">delete</a>
    </li>
  </ul>
</template>

<script lang="ts">

import { defineComponent, PropType } from 'vue'
import { PostModel } from '@/core/features/posts/post.model'
import { UserModel } from '@/core/features/users/user.model'

export default defineComponent({
  inject: ['PostStore'],
  props: {
    user: {
      type: Object as PropType<UserModel>,
      required: true
    },
    posts: {
      type: Object as PropType<PostModel[]>,
      required: true
    }
  }
})
</script>

<style scoped>

</style>
