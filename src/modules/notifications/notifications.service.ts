import { Session_Auth_I } from '@auth/interfaces/auth.interface';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Create_Notification_Dto } from './dto/create-notification.dto';
import { ExceptionsHandler } from '@core/helpers/Exceptions.handler';
import { PrismaService } from '@db/prisma/prisma.service';
import { CreateResponse } from '../../core/helpers/createResponse';
import { NotificationsCreate_UC } from './useCases/notifications-create.use-case';

@Injectable()
export class NotificationsService {

  private readonly logger = new Logger('NotificationsService');

  constructor(
    private readonly prismaService: PrismaService,
    private readonly exceptionsHandler: ExceptionsHandler

  ) {

  }

  async create(create_notification: Create_Notification_Dto) {

    try {

      const resp = await this.prismaService.$transaction(async (prisma) => {
        return NotificationsCreate_UC(create_notification, prisma);
      });

      return CreateResponse({
        ok: true,
        statusCode: HttpStatus.CREATED,
        message: 'Notification created',
        data: resp
      })

    } catch (error) {
      this.logger.error(`[Notification Create] Error: ${error}`);
      this.exceptionsHandler.EmitException(error, 'NotificationsService.create');
    }

   }

  async get_all(user_auth: Session_Auth_I) {

    try {

    } catch (error) {
      this.logger.error(`[Notification Get All] Error: ${error}`);
      this.exceptionsHandler.EmitException(error, 'NotificationsService.get_all');
    }

  }

}
