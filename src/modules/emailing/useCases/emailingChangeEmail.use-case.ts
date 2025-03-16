import { EmailChange_Template } from '@emailing/templates/emailChange.template';
import { EmailingSendEmail_UC } from './emailingSendEmail.use-case';
import { Send_Email_Dto, Email_ChangeEmail_I } from '@luiexplica/ia-dev-services';


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
