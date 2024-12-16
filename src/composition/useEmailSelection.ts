import { reactive } from 'vue'
import axios from 'axios'
import { EmailModel } from '@/model/emailModel'

const emailSet = new Set<EmailModel>()

export const useEmailSelection = function () {
  const emails: Set<EmailModel> = reactive(emailSet)

  // stateFull function...loop over email and trigger callbackParams
  const _forSelected = (fn:(e:EmailModel)=>void) => {
    emails.forEach(async email => {
      fn(email)
      await axios.put(`http://localhost:3000/emails/${email.id}`, email)
    })
  }

  // stateFull function...
  const clear = () => {
    emails.clear()
  }

  // stateFull function...
  const toggle = (email: EmailModel) => {
    if (emails.has(email)) {
      emails.delete(email)
    } else {
      emails.add(email)
    }
  }
  // stateFull function...
  const addMultiple = (newEmails:EmailModel[]) => {
    newEmails.forEach(email => {
      emails.add(email)
    })
  }
  const markRead = () => { _forSelected(e => { e.read = true }) }
  const markUnread = () => { _forSelected(e => { e.read = false }) }
  const archive = () => { _forSelected(e => { e.archived = true; clear() }) }
  const moveToInbox = () => { _forSelected(e => { e.archived = false; clear() }) }

  return {
    emails,
    clear,
    toggle,
    addMultiple,
    markRead,
    markUnread,
    archive,
    moveToInbox
  }
}

export default useEmailSelection
