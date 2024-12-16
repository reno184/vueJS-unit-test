<template>
  <div class="bulk-action-bar">
    <span class="checkbox">
    <input type="checkbox" :checked="allAreSelected" :class="[partialSelection ? 'partial-check' : '']" @click="bulkSelect"></span>
    <span class="buttons">
      <!-- Mark all read  -->
      <button @click="emailSelection.markRead()" :disabled="Array.from(emailSelection.emails).every(e => e.read)">Mark Read</button>
      <!-- Mark all not read -->
      <button @click="emailSelection.markUnread()" :disabled="Array.from(emailSelection.emails).every(e => !e.read)">Mark Unread</button>
      <!-- if view inbox -->
      <button v-if="selectedScreen === 'inbox'" @click="emailSelection.archive()" :disabled="numberSelected === 0">Archive</button>
      <!-- if view Archive -->
      <button v-else @click="emailSelection.moveToInbox()" :disabled="numberSelected === 0">Move to Inbox</button>
    </span>
  </div>
</template>

<script lang="ts">
import { useEmailSelection } from '@/composition/useEmailSelection'
import { computed, defineComponent, PropType } from 'vue'
import { TScreen } from '@/model/screenType'
import { EmailModel } from '@/model/emailModel'

export default defineComponent({
  name: 'BulkActionBar',
  setup (props) {
    // this computed is reused by multi-components
    const emailSelection = useEmailSelection()

    // alias set array length
    const numberSelected = computed(() => {
      return emailSelection.emails.size
    })
    // compare all email Length and emailChecked length
    const allAreSelected = computed(() => {
      return props.emails.length === numberSelected.value && numberSelected.value !== 0
    })
    // compare all email Length and emailChecked length
    const partialSelection = computed(() => {
      return numberSelected.value > 0 && !allAreSelected.value
    })
    // toggle all selected and none selected
    const bulkSelect = function () {
      if (allAreSelected.value) {
        emailSelection.clear()
      } else {
        emailSelection.addMultiple(props.emails)
      }
    }

    return {
      partialSelection,
      allAreSelected,
      bulkSelect,
      emailSelection,
      numberSelected
    }
  },
  props: {
    emails: {
      type: Array as PropType<EmailModel[]>,
      required: true
    },
    selectedScreen: {
      type: String as PropType<TScreen>,
      required: true
    }
  }
})
</script>

<style scoped>

</style>
