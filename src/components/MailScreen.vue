<template>
  <button @click="selectScreen('inbox');" :class="[selectedScreen === 'inbox' ? 'selected' : '']">Inbox View</button>
  <button @click="selectScreen('archive')" :class="[selectedScreen === 'archive' ? 'selected' : '']">Archived View</button>
  <h1>VMail {{capitalize(selectedScreen)}}</h1>
  <BulkActionBar :emails="filteredEmails" :selectedScreen="selectedScreen" />
  <MailTable :emails="filteredEmails" />
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import { EmailModel } from '@/model/emailModel'
import BulkActionBar from '@/components/BulkActionBar.vue'
import MailTable from '@/components/MailTable.vue'
import axios from 'axios'
import useEmailSelection from '@/composition/useEmailSelection'
import { TScreen } from '@/model/screenType'
import { IEmailManager } from '@/manager/EmailManager'

export default defineComponent({
  name: 'MailScreen',
  emits: [''],
  components: {
    BulkActionBar,
    MailTable
  },
  async setup () {
    const emailManager = inject('emailManager') as IEmailManager

    const response = await axios.get('http://localhost:3000/emails')
    const emails:EmailModel[] = response.data
    const selectedScreen = 'inbox'
    const emailSelection = useEmailSelection() as { clear : () =>void}

    return { emails, selectedScreen, emailSelection, emailManager }
  },
  computed: {
    // todo merge thoses computed in once
    sortedEmails (): EmailModel[] {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.emails.sort((e1: EmailModel, e2:EmailModel) => {
        return e1.sentAt < e2.sentAt ? 1 : -1
      })
    },
    unarchivedEmails () {
      return this.sortedEmails.filter(e => !e.archived)
    },
    archivedEmails () {
      return this.sortedEmails.filter(e => e.archived)
    },
    filteredEmails (): EmailModel[] {
      const filters:Record<TScreen, EmailModel[]> = {
        inbox: this.unarchivedEmails,
        archive: this.archivedEmails
      }
      return filters[this.selectedScreen as TScreen]
    }
  },
  methods: {
    selectScreen (newScreen: TScreen) {
      this.selectedScreen = newScreen
      this.emailSelection.clear()
    },
    capitalize (word:string) {
      if (!word || !word.length) { return }
      return word[0].toUpperCase() + word.slice(1)
    }
  }
})
</script>

<style scoped lang="scss">

</style>
