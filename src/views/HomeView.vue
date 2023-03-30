<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  components: {},
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
  }
})
</script>

<style scoped>

</style>
