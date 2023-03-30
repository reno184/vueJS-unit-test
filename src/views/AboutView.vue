<template>
  <div class="about">
    <h3>Let us test your arithmetic.</h3>
    <p>What is the sum of the two numbers?</p>
    <div>
      <p>{{ x1 }} + {{ x2 }} =</p> <input v-model="guess"> <button v-on:click="check">Check Answer</button>
    </div>
    <div>
      {{total}}
    </div>
    <br>
    <button v-on:click="refresh">Refresh</button>
    <p>{{message}}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    id: {
      type: String,
      default: 'foo'
    }
  },
  data () {
    return {
      x1: Math.ceil(Math.random() * 100),
      x2: Math.ceil(Math.random() * 100),
      guess: '',
      message: ''
    }
  },
  computed: {
    total () {
      return this.x1 + this.x2
    }
  },
  methods: {
    check () {
      if (this.x1 + this.x2 === parseInt(this.guess)) {
        this.message = 'SUCCESS!'
      } else {
        this.message = 'TRY AGAIN'
      }
    },
    refresh () {
      this.x1 = Math.ceil(Math.random() * 100)
      this.x2 = Math.ceil(Math.random() * 100)
    }
  }
})
</script>

<style scoped>

</style>
