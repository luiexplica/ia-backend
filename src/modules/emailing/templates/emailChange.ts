// import * as nodemailer from 'nodemailer';
// import { envs } from "@core/config/envs";
// import { EmailConfig } from "@emailing/config/email.config";
// import { Email_I } from '@emailing/interfaces/emailing.interface';


// interface Props_I {
//     props: Email_I,
//     data: {
//         name: string,
//         new_email
//         key: string
//     }
// }

// export const EmailChange = async ({
//     props,
//     data
// }: Props_I) => {

//     const {
//         from,
//         to,
//     } = props

//     const transporter = nodemailer.createTransport(EmailConfig());

//     try {

//         const subject: string = `Cambio de correo electrónico`;
//         const html: string = `
//             <p>Hola</p>
//             <p>Has solicitado un cambio de correo electrónico a ${data.new_email} en tu cuenta.</p>
//             <p>Si no has sido tú, ignora este mensaje.</p>
//             <p>Para confirmar el cambio, haz clic en el siguiente enlace:</p>
//             <a href="${envs.web_url}/verify/${data.key}">Confirmar cambio</a>
//         `;

//         const info = await transporter.sendMail({
//             from,
//             to,
//             subject,
//             html
//         });

//         console.log("Message sent: %s", info.messageId);

//     } catch (error) {

//         console.error('[EmailChange] Email error:', error)

//     }


// }
