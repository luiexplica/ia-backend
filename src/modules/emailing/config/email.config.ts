import { envs } from "@core/config/envs"
import { EmailConfig_I } from "../interfaces/emailing.interface"

export const EmailConfig = (): EmailConfig_I => {

  /*
  email_host
email_port
email_secure
email_user
email_pass
email_service
web_url
   */

    let conf: any = {
        host: envs.email_host,
        port: envs.email_port,
        secure: envs.email_secure,
    }

    if (envs.email_service != '') {
        conf = {
            service: envs.email_service
        }
    }

    return {
        ...conf,
        auth: {
            pass: envs.email_pass,
            user: envs.email_user
        }

    }

}