<template>
  <div class="email-display">
    <div class="toolbar">
      <button data-test="btnPrev" @click="goOlder">Prev (j)</button>
      <button data-test="btnNext" @click="goNewer">Next (k)</button>
      <button data-test="btnFav" @click="toggleFavorite">Favorite</button>
      <button data-test="btnClose" @click="closeModal">Close (escape)</button>
    </div>
    <template v-for="(item, key) in emails" :key="key" >
      <template v-if="key === index">
        <h2 data-test="renderMailSubject" class="mb-0">Subject: <strong>{{item.subject}}</strong>
          <span   style="display:inline-block; margin-left:10px;color: orange">
          <span data-test="renderFav" v-if="item.favorite">&#9733;</span>
          <span data-test="renderNotFav"  v-else>&#9734;</span>
          </span>
        </h2>
        <div><em>From {{item.from}} on {{format(new Date(item.sentAt), 'MMM do yyyy')}}</em></div>
        <div v-html="marked(item.body)" />
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
  data () {
    return { index: 0 }
  },
  setup () {
    return {
      format,
      marked
    }
  },
  created () {
    useKeydown([
      { key: 'e', fn: this.toggleFavorite },
      { key: 'k', fn: this.goNewer },
      { key: 'j', fn: this.goOlder }
    ])
  },
  methods: {
    goNewer (): void {
      this.index = this.index === this.emails.length - 1 ? 0 : this.index + 1
    },
    goOlder (): void {
      this.index = this.index === 0 ? this.emails.length - 1 : this.index - 1
    },
    toggleFavorite (): void {
      this.updateEmailFn(this.emails[this.index], { toggleFavorite: true })
    }
  }

})
</script>

<style scoped>

</style>
