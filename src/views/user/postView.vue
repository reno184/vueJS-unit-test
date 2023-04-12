<template>
  <div>Posts list</div>
  <div v-for="item in items" :key="item.id">
    <span>{{ item.title }}</span><a href="#" title="delete" @click.prevent="$emit('delete', item.id)">delete</a>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { PostModel } from '@/core/features/post/postModel'

export default defineComponent({
  props: {
    items: {
      type: Object as PropType<PostModel[]>
    }
  }
})
</script>

<style scoped>

</style>
