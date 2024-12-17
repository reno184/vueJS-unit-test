import { EmailModel } from '@/model/emailModel'
export interface IEmailManager {
  init: EmailModel
}
export const CreateEmailManager = function () {
  return {
    init: {
      id: -1,
      body: '',
      from: '',
      read: false,
      archived: false,
      sentAt: '2024-02-02',
      subject: ''
    } as EmailModel
  }
}
