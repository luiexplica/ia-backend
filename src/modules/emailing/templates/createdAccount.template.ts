

import { envs } from "@core/config/envs";
import { Email_CreatedAccount_I } from '@emailing/interfaces/createAccount.interface';
import { Email_I } from "@emailing/interfaces/emailing.interface";

export const CreatedAccount_Template = (props: Email_CreatedAccount_I['data']): Partial<Email_I> => {

  const subject: string = `Te damos la bienvenida a la plataforma`;
  const html: string = `
            <h1>¡Hola!</h1>
            <p>Gracias por registrarte en nuestra plataforma.</p>
            <p>Para activar tu cuenta, por favor haz click en el siguiente enlace:</p>
            <a href="${envs.web_url}/verify/${props.key}">Activar cuenta</a>
        `;

  return {
    subject,
    html
  }

}




