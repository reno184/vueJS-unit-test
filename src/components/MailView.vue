<template>
  <div class="email-display">
    <div class="toolbar">
      <button @click="toggleArchive">{{email.archived ? 'Move to Inbox (e)' : 'Archive (e)'}}</button>
      <button @click="toggleRead">{{email.read ? 'Mark Unread (r)' : 'Mark Read (r)'}}</button>
      <button @click="goNewer">Newer (k)</button>
      <button @click="goOlder">Older (j)</button>
    </div>

    <h2 class="mb-0">Subject: <strong>{{email.subject}}</strong></h2>
    <div><em>From {{email.from}} on {{format(new Date(email.sentAt), 'MMM do yyyy')}}</em></div>
    <div v-html="markdown(email.body)" />
  </div>
</template>

<script lang="ts">
import { format } from 'date-fns'
import { marked } from 'marked'
import { useKeydown } from '@/composition/useKeydown'
import { defineComponent, PropType } from 'vue'
import { ChangeEmailArgument, EmailModel } from '@/model/emailModel'

export default defineComponent({
  name: 'MailView',
  setup (props) {
    const toggleArchive = () => props.changeEmail(props.email, { toggleArchive: true, save: true, closeModal: true })
    const toggleRead = () => props.changeEmail(props.email, { toggleRead: true, save: true })
    const goNewer = () => props.changeEmail(props.email, { indexChange: -1 })
    const goOlder = () => props.changeEmail(props.email, { indexChange: 1 })
    const goNewerAndArchive = () => props.changeEmail(props.email, { indexChange: -1, toggleArchive: true })
    const goOlderAndArchive = () => props.changeEmail(props.email, { indexChange: 1, toggleArchive: true })

    useKeydown([
      { key: 'e', fn: toggleArchive },
      { key: 'r', fn: toggleRead },
      { key: 'k', fn: goNewer },
      { key: 'j', fn: goOlder },
      { key: '[', fn: goNewerAndArchive },
      { key: ']', fn: goOlderAndArchive }
    ])

    return {
      format,
      markdown: marked,
      goOlder,
      goNewer,
      toggleRead,
      toggleArchive
    }
  },
  props: {
    email: {
      type: Object as PropType<EmailModel>,
      required: true
    },
    changeEmail: {
      type: Function as PropType<(email:EmailModel, args : ChangeEmailArgument)=>void>,
      required: true
    }
  }
})
</script>

<style scoped>

</style>
