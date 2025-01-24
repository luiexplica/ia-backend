import { EmailingChangeEmail_UC } from './useCases/emailingChangeEmail.use-case';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@db/prisma/prisma.service';
import { ExceptionsHandler } from '@core/helpers/Exceptions.handler';
import { Send_Email_Dto } from './dto/send-email.dto';
import { EmailingCreateAccount_UC } from './useCases/emailingCreateAccount.use-case';
import { EmailingResetPassword_UC } from './useCases/emailingResetPass.use-case';

export const EMAILING_SERVICE_TOKEN = 'EMAILING_SERVICE';
@Injectable()
export class EmailingService {

  private readonly logger = new Logger('NotificationsService');

  constructor(
    // private readonly prismaService: PrismaService,
    private readonly exceptionsHandler: ExceptionsHandler

  ) {

  }

  async send_email(emailing: Send_Email_Dto) {

    const {
      change_email,
      confirm_account,
      reset_password
    } = emailing;

    try {

        console.log('emailing', emailing);

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
