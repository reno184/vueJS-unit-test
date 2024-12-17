<template>
  <div class="email-display">
    <div class="toolbar">
      <button @click="goOlder">Prev (j)</button>
      <button @click="goNewer">Next (k)</button>
      <button @click="toggleFavorite">Favorite</button>
      <button @click="closeModal">Close (escape)</button>
    </div>
    <template v-for="(item, key) in emails" :key="key" >
      <template v-if="key === indexEmail">
        <h2 class="mb-0">Subject: <strong>{{item.subject}}</strong>
          <span  style="display:inline-block; margin-left:10px;color: orange">
          <template v-if="item.favorite">&#9733;</template>
          <template v-else>&#9734;</template>
          </span>
        </h2>
        <div><em>From {{item.from}} on {{format(new Date(item.sentAt), 'MMM do yyyy')}}</em></div>
        <div v-html="markdown(item.body)" />
      </template>

    </template>
  </div>
</template>

<script lang="ts">
import { format } from 'date-fns'
import { marked } from 'marked'
import { useKeydown } from '@/composition/useKeydown'
import { defineComponent, PropType, ref } from 'vue'
import { ChangeEmailArgument, EmailModel } from '@/model/emailModel'

export default defineComponent({
  name: 'MailView',
  props: {
    closeModal: {
      type: Function as PropType<()=>void>,
      required: true
    },
    emails: {
      type: Array as PropType<EmailModel[]>,
      required: true
    },
    updateEmailFn: {
      type: Function as PropType<(email:EmailModel, args : ChangeEmailArgument)=>void>,
      required: true
    }
  },
  setup (props) {
    const index = ref<number>(0)
    const toggleFavorite = () => { return props.updateEmailFn(props.emails[index.value], { toggleFavorite: true, save: true }) }
    const goNewer = () => { index.value = index.value === props.emails.length - 1 ? 0 : index.value + 1 }
    const goOlder = () => { index.value = index.value === 0 ? props.emails.length - 1 : index.value - 1 }

    useKeydown([
      { key: 'e', fn: toggleFavorite },
      { key: 'k', fn: goNewer },
      { key: 'j', fn: goOlder }
    ])

    return {
      indexEmail: index,
      format,
      markdown: marked,
      goOlder,
      goNewer,
      toggleFavorite
    }
  }

})
</script>

<style scoped>

</style>
