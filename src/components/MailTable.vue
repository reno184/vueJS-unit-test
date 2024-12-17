<template>
  <table class="mail-table">
    <tbody>
    <tr v-for="email in emails" :key="email.id" :class="[email.read ? 'read': '', 'clickable']" >
      <td>
        <input type="checkbox" :checked="emailSelection.emails.has( email.id)" @click="emailSelection.toggle(email)" />
      </td>
      <td>{{email.from}}</td>
      <td>
        <p>
          <span  style="display:inline-block; margin-right:10px;color: orange">
          <template v-if="email.favorite">&#9733;</template>
          <template v-else>&#9734;</template>
          </span>
          {{email.subject}} - {{email.body}}</p>
      </td>
      <td class="date">{{format(new Date(email.sentAt), 'MMM do yyyy')}}</td>
      <td><button @click="toggleRead(email)">Read</button></td>
      <td><button @click="updateEmailFn(email, { toggleArchive : !email.archived})"><template v-if="email.archived">Un</template>Archive</button></td>
    </tr>
    </tbody>
  </table>

  <ModalView v-if="modal" :closeModal="() => { this.modal = false }">
    <MailView :emails="emails" :updateEmailFn="updateEmailFn" :closeModal="() => { this.modal = false }" />
  </ModalView>
</template>

<script lang="ts">
import { format } from 'date-fns'
import MailView from '@/components/MailView.vue'
import ModalView from '@/components/ModalView.vue'
import { useEmailSelection } from '@/composition/useEmailSelection'

import { defineComponent, inject, PropType } from 'vue'
import { ChangeEmailArgument, EmailModel } from '@/model/emailModel'
import { IEmailManager } from '@/manager/EmailManager'
import useKeydown from '@/composition/useKeydown'

export default defineComponent({
  name: 'MailTable',
  props: {
    emails: {
      type: Array as PropType<EmailModel[]>,
      required: true
    },
    updateEmailFn: {
      type: Function as PropType<(email:EmailModel, args : ChangeEmailArgument)=>void>,
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
    return { modal: false, emailClone: [] as EmailModel[] }
  },
  methods: {
    toggleRead: function (email : EmailModel) {
      this.modal = true
      this.updateEmailFn(email, { toggleRead: true })
    }
  }

})
</script>

<style scoped>
/* Mail Table */

.mail-table {
  max-width: 1000px;
  margin: auto;
  border-collapse: collapse;
}
.mail-table tr.read {
  font-weight: normal;
}
.mail-table tr {
  height: 40px;
  font-weight: bold;
}
.mail-table td {
  border-bottom: 1px solid black;
  padding: 5px;
  text-align: left;
}
.mail-table tr:first-of-type td {
  border-top: 1px solid black;
}
.mail-table td p {
  max-height: 1.2em;
  overflow-y: hidden;
  margin: 0;
}

.mail-table td.date {
  width: 120px;
}

</style>
