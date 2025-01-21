import { EmailChange_Template } from '@emailing/templates/emailChange.template';
import { Send_Email_Dto } from "@emailing/dto/send-email.dto";
import { Email_ChangeEmail_I } from "@emailing/interfaces/emailing.interface";
import { EmailingSendEmail_UC } from './emailingSendEmail.use-case';


export const EmailingChangeEmail_UC = async (send_email: Send_Email_Dto) => {

  const email: Email_ChangeEmail_I = {
    props: {
      to: send_email.to,
      subject: '',
      html: ''
    },
    data: {
      ...send_email.change_email
    }
  }
  const {to} = email.props
  const { subject, html } = EmailChange_Template(email.data)

  EmailingSendEmail_UC({
    // from,
    to,
    subject,
    html
  });

}
