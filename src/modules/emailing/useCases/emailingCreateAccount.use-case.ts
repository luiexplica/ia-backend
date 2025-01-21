import { CreatedAccount_Template } from "@emailing/templates/createdAccount.template";
import { EmailingSendEmail_UC } from "./emailingSendEmail.use-case";
import { Send_Email_Dto } from '@emailing/dto/send-email.dto';
import { Email_CreatedAccount_I } from "@emailing/interfaces/emailing.interface";

export const EmailingCreateAccount_UC = async (send_email: Send_Email_Dto) => {

  const email: Email_CreatedAccount_I = {
    props: {
      to: send_email.to,
      subject: '',
      html: ''
    },
    data: {
      ...send_email.confirm_account
    }
  }
  const {to} = email.props
  const { subject, html } = CreatedAccount_Template(email.data)

  EmailingSendEmail_UC({
    // from,
    to,
    subject,
    html
  });

}

