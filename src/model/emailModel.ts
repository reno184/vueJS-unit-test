export interface EmailModel {
  id: number
  read : boolean
  archived: boolean
  sentAt: string
  body: string
  from :string
  subject :string
}
export interface ChangeEmailArgument {
  indexChange?: number
  toggleArchive?: boolean
  toggleRead?: boolean
  save?: boolean
  closeModal?: boolean
}