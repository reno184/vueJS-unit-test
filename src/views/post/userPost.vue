<template>
  <p data-test="mock">{{mocked}}</p>
  <ul>
    <li v-for="(item, index) in items" :key="index" >{{item.title}}</li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'userPost',
  emits: [''],
  components: {},
  setup () {
    return { mocked: false }
  },
  async created () {
    if (this.mocked) {
      this.items = await new Promise((resolve) => resolve([{
        userId: 1,
        id: 1,
        title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
      },
      {
        userId: 1,
        id: 2,
        title: 'qui est esse',
        body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla'
      },
      {
        userId: 1,
        id: 3,
        title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
        body: 'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut'
      },
      {
        userId: 1,
        id: 4,
        title: 'eum et est occaecati',
        body: 'ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit'
      }]))
    } else {
      const result = await fetch('https://jsonplaceholder.typicode.com/users/' + this.$route.params.userId + '/posts?_limit=4&_page=1')
      this.items = await result.json()
    }
  },
  data () {
    return { items: [] as { userId: number, id: number, title: string, body: string}[] }
  },
  props: {},
  computed: {},
  methods: {}
})
</script>

<style scoped lang="scss">

</style>
