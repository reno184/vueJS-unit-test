<template>
  <div class="bulk-action-bar">
    <span class="checkbox">
    <input type="checkbox" :checked="allAreSelected" :class="[partialSelection ? 'partial-check' : '']" @click="bulkSelect"></span>
    <span class="buttons" style="flex: 1">
      <!-- Mark all read  -->
      <button @click="markStateRead(true)" :disabled="!partialSelection">Mark Read (o)</button>
      <!-- Mark all not read -->
      <button @click="markStateRead(false)" :disabled="!partialSelection">Mark Unread (p)</button>
      <!-- if view inbox -->
      <button v-if="selectedScreen === 'inbox'" @click="moveToArchive(true)" :disabled="numberSelected === 0">Archive</button>
      <!-- if view Archive -->
      <button v-else @click="moveToArchive(false)" :disabled="numberSelected === 0">Move to Inbox</button>
    </span>
    <label>Save action to db.json <input type="checkbox" :checked="persist" @click="persist = !persist"></label>
  </div>

</template>

<script lang="ts">
import { useEmailSelection } from '@/composition/useEmailSelection'
import { computed, defineComponent, PropType, ref } from 'vue'
import { TScreen } from '@/model/screenType'
import { ChangeEmailArgument, EmailModel } from '@/model/emailModel'
import useKeydown from '@/composition/useKeydown'

export default defineComponent({
  name: 'BulkActionBar',
  watch: {
    persist: {
      immediate: true,
      handler: function (value: boolean) {
        this.$router.push({ query: { persist: value ? 'true' : undefined } })
      }
    }
  },
  setup (props) {
    const persist = ref(false)
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
      return numberSelected.value > 0
    })
    // toggle all selected and none selected
    const bulkSelect = function () {
      if (allAreSelected.value) {
        emailSelection.clear()
      } else {
        emailSelection.addMultiple(props.emails)
      }
    }
    useKeydown([
      { key: 'o', fn: () => { markStateRead(true) } },
      { key: 'p', fn: () => { markStateRead(false) } }
    ])

    const markStateRead = function (read: boolean) {
      props.emails.forEach(email => {
        if (emailSelection.emails.has(email.id)) {
          props.updateEmailFn(email, { toggleRead: read })
        }
      })
      emailSelection.clear()
    }

    const moveToArchive = function (value : boolean) {
      props.emails.forEach(email => {
        if (emailSelection.emails.has(email.id)) {
          props.updateEmailFn(email, { toggleArchive: value })
        }
      })
      emailSelection.clear()
    }

    return {
      partialSelection,
      allAreSelected,
      bulkSelect,
      emailSelection,
      numberSelected,
      markStateRead,
      moveToArchive,
      persist
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
    },
    updateEmailFn: {
      type: Function as PropType<(email:EmailModel, args : ChangeEmailArgument)=>void>,
      required: true
    }
  }
})
</script>

<style scoped>
/* Bulk Action Bar */

.bulk-action-bar {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1000px;
  margin: auto;
  text-align: left;
  padding-bottom: 8px;
}

.bulk-action-bar input {
  margin: 5px;
}

.bulk-action-bar .checkbox {
  margin-right: 6px;
  margin-left: 3px;
}
</style>
