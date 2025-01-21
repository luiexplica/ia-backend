import { Email_I } from "./emailing.interface"

export interface Email_CreatedAccount_I {
  props: Email_I,
  data: {
    name: string,
    key: string
  }
}