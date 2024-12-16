<template>
  <div class="modal">
    <div class="overlay" @click="closeModal"></div>
    <div class="modal-card">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { useKeydown } from '@/composition/useKeydown'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'ModalView',
  setup (props) {
    useKeydown([{ key: 'Escape', fn: props.closeModal }])
  },
  props: {
    closeModal: {
      type: Function as PropType<()=>void>,
      required: true
    }
  }
})
</script>

<style scoped>

</style>
