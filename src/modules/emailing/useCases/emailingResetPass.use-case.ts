import { EmailingSendEmail_UC } from "./emailingSendEmail.use-case";
import { Send_Email_Dto } from '@emailing/dto/send-email.dto';
import { Email_ResetPassword_I } from "@emailing/interfaces/emailing.interface";
import { ResetPassword_Template } from "../templates/resetPass.template";

export const EmailingResetPassword_UC = async (send_email: Send_Email_Dto) => {

  const email: Email_ResetPassword_I = {
    props: {
      to: send_email.to,
      subject: '',
      html: ''
    },
    data: {
      ...send_email.reset_password
    }
  }
  const {to} = email.props
  const { subject, html } = ResetPassword_Template(email.data)

  EmailingSendEmail_UC({
    // from,
    to,
    subject,
    html
  });

}

