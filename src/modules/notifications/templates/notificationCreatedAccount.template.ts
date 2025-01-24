
export const NotificationCreatedAccount_Template = () => {

  const subject: string = `Te damos la bienvenida a la plataforma`;
  const message: string = `Gracias por registrarte en nuestra plataforma. Estamos muy contentos de tenerte con nosotros.`;
  // <a href="${envs.web_url}/verify/${props.key}">Activar cuenta</a>

  return {
    subject,
    message
  }

}