import { reactive } from 'vue'
import { EmailModel } from '@/model/emailModel'

const emailSet = new Set<number>()

export const useEmailSelection = function () {
  const _emailSelected: Set<number> = reactive(emailSet)

  // stateFull function...loop over email and trigger callbackParams
  /*  const _forSelected = (fn:(e:EmailModel)=>void) => {
    _emailSelected.forEach(async email => {
      fn(email)
      await axios.put(`http://localhost:3000/emails/${email.id}`, email)
    })
  } */

  // stateFull function...
  const clear = () => {
    _emailSelected.clear()
  }

  // stateFull function...
  const toggle = (email: EmailModel) => {
    if (_emailSelected.has(email.id)) {
      _emailSelected.delete(email.id)
    } else {
      _emailSelected.add(email.id)
    }
  }
  // stateFull function...
  const addMultiple = (newEmails:EmailModel[]) => {
    newEmails.forEach(email => {
      _emailSelected.add(email.id)
    })
  }
  /* const markRead = () => { _forSelected(e => { e.read = true }) }
  const markUnread = () => { _forSelected(e => { e.read = false }) }
  const archive = () => { _forSelected(e => { e.archived = true; clear() }) }
  const moveToInbox = () => { _forSelected(e => { e.archived = false; clear() }) } */

  return {
    emails: _emailSelected,
    clear,
    toggle,
    addMultiple
    /*    markRead,
    markUnread,
    archive,
    moveToInbox */
  }
}

export default useEmailSelection
