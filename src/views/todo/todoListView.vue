<template>
  <div v-if="stateTodo.loading">loading...</div>
  <div v-else style="width: 40%">
    <div  v-for="item in stateTodo.list" :key="item.id" style="display: flex; line-height: 2rem; border-bottom: 1px solid #aaa;">
      <span style="flex: 1">{{ item.title }}</span><a href="#" @click.prevent="onDelete(item.id)" title="delete">delete</a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ITodoStore } from '@/core/features/todos/todo.store'

export default defineComponent({
  inject: ['TodoStore'],
  components: {},
  computed: {
    stateTodo () {
      return (this.TodoStore as ITodoStore).state
    }
  },
  created () {
    (this.TodoStore as ITodoStore).action.fetch()
  },
  methods: {
    onDelete (id:number) {
      (this.TodoStore as ITodoStore).action.delete(id)
    }
  }
})
</script>

<style scoped>

</style>
