import { Email_ChangeEmail_I, Email_I } from "@emailing/interfaces/emailing.interface";
import { envs } from "@core/config/envs";

export const EmailChange_Template = (props: Email_ChangeEmail_I['data']): Partial<Email_I> => {

  const subject: string = `Cambio de correo electrónico`;
  const html: string = `
               <h1>¡Hola ${props.name}!</h1>
            <p>Has solicitado un cambio de correo electrónico a ${props.new_email} en tu cuenta.</p>
            <p>Si no has sido tú, ignora este mensaje.</p>
            <p>Para confirmar el cambio, haz clic en el siguiente enlace:</p>
            <a href="${envs.web_url}/verify/${props.key}">Confirmar cambio</a>
        `;

  return {
    subject,
    html
  }

}

