import { Injectable, Logger } from '@nestjs/common';
import { EmailingChangeEmail_UC } from '@emailing/useCases/emailingChangeEmail.use-case';
import { ExceptionsHandler } from '@core/helpers/Exceptions.handler';
import { Send_Email_Dto } from '@emailing/dto/send-email.dto';
import { EmailingResetPassword_UC } from '@emailing/useCases/emailingResetPass.use-case';
import { EmailingCreateAccount_UC } from '@emailing/useCases/emailingCreateAccount.use-case';
import { Create_EmailByRequest_I } from '@emailing/interfaces/emailing.interface';
import { RequestType_Enum } from '@ac-requests/interfaces/accountRequests.inteface';

@Injectable()
export class EmailingService {

  private readonly logger = new Logger('NotificationsService');

  constructor(
    private readonly exceptionsHandler: ExceptionsHandler
  ) {
  }

  async send_emailByRequest(data: Create_EmailByRequest_I) {

    const {
      name,
      key,
      detail,
      to,
      typeRequest
    } = data;
    let email: Send_Email_Dto;

    if (typeRequest === RequestType_Enum.CONFIRM_ACCOUNT) {
      email = {
        to,
        confirm_account: {
          key,
          name
        }
      }
    }
    if (typeRequest === RequestType_Enum.CHANGE_EMAIL) {
      email = {
        to,
        change_email: {
          new_email: detail,
          key,
          name,
        }
      }
    }
    if (typeRequest === RequestType_Enum.RESET_PASSWORD) {
      email = {
        to,
        reset_password: {
          key,
          name
        }
      }
    }

    console.log('email', email);

    if (email) {
     await this.send_email(email)
    }

  }

  async send_email(emailing: Send_Email_Dto) {

    const {
      change_email,
      confirm_account,
      reset_password
    } = emailing;

    try {

      switch (true) {
        case !!change_email:
          this.logger.log('Sending change email');
          EmailingChangeEmail_UC(emailing)
          break;
        case !!confirm_account:
          this.logger.log('Sending confirm account email');
          EmailingCreateAccount_UC(emailing)
          break;
        case !!reset_password:
          this.logger.log('Sending reset password email');
          EmailingResetPassword_UC(emailing)
          break;
        default:
          this.logger.warn('No valid email type provided');
          throw new Error('No valid email type provided');
      }

    } catch (error) {

      this.logger.error(`[Emailing Send] Error: `, error);
      this.exceptionsHandler.EmitException(error, 'EmailingService.send_email');

    }

  }

}
