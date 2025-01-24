
export const NotificationResetPassword_Template = () => {

  const subject: string = `Recuperación de contraseña`;
  const message: string = `Hemos recibido una solicitud para cambiar tu contraseña. Dirígete a tu correo electrónico para seguir los pasos y completar el proceso.`;

  return {
    subject,
    message
  }

}