<template>
<div>home</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getPostId } from '@/core/services/JsonPlaceholder'

export default defineComponent({

  data () {
    return { firstName: '' }
  },
  mounted () {
    this.firstName = 'renaud'
  },
  computed: {
    hello ():string {
      return 'hello ' + this.firstName
    }
  },
  methods: {
    onClick () {
      getPostId(9).then(result => {
        console.log(result)
      })
    }
  }
})
</script>

<style scoped>

</style>
