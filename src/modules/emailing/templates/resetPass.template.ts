

import { envs } from "@core/config/envs";
import { Email_I, Email_ResetPassword_I } from "@emailing/interfaces/emailing.interface";

export const ResetPassword_Template = (props: Email_ResetPassword_I['data']): Partial<Email_I> => {

  const subject: string = `Recuperación de contraseña`;
  const html: string = `
            <h1>¡Hola ${props.name}!</h1>
            <p>Has solicitado recuperar tu contraseña.</p>
            <p>Para cambiar tu contraseña, por favor haz click en el siguiente enlace:</p>
            <a href="${envs.web_url}/verify/${props.key}">Cambiar contraseña</a>
        `;

  return {
    subject,
    html
  }

}




