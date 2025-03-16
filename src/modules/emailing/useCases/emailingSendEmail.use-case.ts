
import { EmailConfig } from "@emailing/config/email.config";
import { Email_I } from "@luiexplica/ia-dev-services";
import * as nodemailer from 'nodemailer';

export const EmailingSendEmail_UC = async (props: Email_I) => {

  const {
    // from,
    to,
    subject,
    html
  } = props

  const transporter = nodemailer.createTransport(EmailConfig())

  const info = await transporter.sendMail({
    // from,
    to,
    subject,
    html
  });

  console.log("Message sent: %s", info.messageId);

}