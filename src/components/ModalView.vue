<!-- https://github.com/Code-Pop/build-gmail-clone-with-vue-3/blob/master/src/components/ModalView.vue  -->
<template>
  <div class="modal">
    <div class="overlay" data-test="pnlOverlay" @click="closeModal"></div>
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
