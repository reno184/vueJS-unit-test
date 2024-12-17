<template>
  <button @click="()=>this.typeEmail= 'inbox'" :class="[typeEmail === 'inbox' ? 'selected' : '']">Inbox View</button>
  <button @click="()=>this.typeEmail= 'archive'" :class="[typeEmail === 'archive' ? 'selected' : '']">Archived View</button>
  <h1>VMail {{capitalize(typeEmail)}}</h1>
  <BulkActionBar :emails="filterList" :selectedScreen="typeEmail" :updateEmailFn="updateEmail" />
  <MailTable :emails="filterList" :updateEmailFn="updateEmail" />
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import { ChangeEmailArgument, EmailModel } from '@/model/emailModel'
import BulkActionBar from '@/components/BulkActionBar.vue'
import MailTable from '@/components/MailTable.vue'
import axios from 'axios'
import useEmailSelection from '@/composition/useEmailSelection'
import { TScreen } from '@/model/screenType'
import { IEmailManager } from '@/manager/EmailManager'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'MailScreen',
  emits: [''],
  components: {
    BulkActionBar,
    MailTable
  },
  async setup () {
    const emailManager = inject('emailManager') as IEmailManager
    const emailSelection = useEmailSelection()
    const route = useRoute()
    const updateEmail = (email:EmailModel, args :ChangeEmailArgument) => {
      if (args.toggleArchive !== undefined) { email.archived = args.toggleArchive }
      if (args.toggleFavorite) { email.favorite = !email.favorite }
      if (args.toggleRead !== undefined) { email.read = args.toggleRead }
      if (route.query.persist) {
        axios.put(`http://localhost:3000/emails/${email.id}`, email)
      }
    }
    return { emailSelection, emailManager, updateEmail }
  },
  data () {
    return { typeEmail: 'inbox', emails: [] as EmailModel[] }
  },
  watch: {
    typeEmail: {
      handler: function (value: TScreen) {
        if (value) {
          this.emailSelection.clear()
        }
      }
    }
  },
  async created () {
    const response = await axios.get('http://localhost:3000/emails')
    this.emails = response.data
  },
  computed: {
    sortedEmails (): EmailModel[] {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.emails.sort((e1: EmailModel, e2:EmailModel) => {
        return e1.sentAt < e2.sentAt ? 1 : -1
      })
    },
    filterList () {
      return this.emails.filter(x => this.typeEmail === 'archive' ? x.archived : !x.archived)
    }
  },
  methods: {
    capitalize (word:string) {
      if (!word || !word.length) { return }
      return word[0].toUpperCase() + word.slice(1)
    }
  }
})
</script>

<style scoped lang="scss">

</style>
