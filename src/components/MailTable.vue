<template>
  <table class="mail-table">
    <tbody>
    <tr v-for="email in emails" :key="email.id" :class="[email.read ? 'read': '', 'clickable']" @click="openEmail(email)">
      <td>
        <input type="checkbox" :checked="emailSelection.emails.has(email)" @click="emailSelection.toggle(email)" />
      </td>
      <td>{{email.from}}</td>
      <td>
        <p><strong>{{email.subject}}</strong> - {{email.body}}</p>
      </td>
      <td class="date">{{format(new Date(email.sentAt), 'MMM do yyyy')}}</td>
      <td><button @click="archiveEmail(email)">Archive</button></td>
    </tr>
    </tbody>
  </table>

  <ModalView v-if="openedEmail" :closeModal="() => { this.openedEmail = emailManager.init; }">
    <MailView :email="openedEmail" :changeEmail="x=>changeEmail(openedEmail,x)" />
  </ModalView>
</template>

<script lang="ts">
import { format } from 'date-fns'
import MailView from '@/components/MailView.vue'
import ModalView from '@/components/ModalView.vue'
import { useEmailSelection } from '@/composition/useEmailSelection'
import axios from 'axios'
import { defineComponent, inject, PropType } from 'vue'
import { ChangeEmailArgument, EmailModel } from '@/model/emailModel'
import { IEmailManager } from '@/manager/EmailManager'

export default defineComponent({
  name: 'MailTable',
  props: {
    emails: {
      type: Array as PropType<EmailModel[]>,
      required: true
    }
  },
  components: {
    MailView,
    ModalView
  },
  setup () {
    const emailManager = inject('emailManager') as IEmailManager
    return {
      emailManager,
      format,
      emailSelection: useEmailSelection()
    }
  },
  data () {
    return { openedEmail: {} as EmailModel }
  },
  created () {
    this.openedEmail = this.emailManager.init
  },
  methods: {
    async openEmail (email:EmailModel) {
      this.openedEmail = email
      if (email) {
        email.read = true
        await axios.put(`http://localhost:3000/emails/${email.id}`, email)
      }
    },
    async archiveEmail (email:EmailModel) {
      email.archived = true
      await axios.put(`http://localhost:3000/emails/${email.id}`, email)
    },
    changeEmail (email:EmailModel, args : ChangeEmailArgument):void {
      if (args.toggleArchive) { email.archived = !email.archived }
      if (args.toggleRead) { email.read = !email.read }
      if (args.save) { axios.put(`http://localhost:3000/emails/${email.id}`, email) }
      if (args.closeModal) { this.openedEmail = this.emailManager.init }

      if (args.indexChange) {
        this.openEmail(this.emails[args.indexChange])
      }
    }
  }

})
</script>

<style scoped>

</style>
