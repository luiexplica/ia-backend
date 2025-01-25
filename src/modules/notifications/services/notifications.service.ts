import { Emailing_Evh_Payload } from '@emailing/services/emailing-eventHandler.service';
import { Session_Auth_I } from '@auth/interfaces/auth.interface';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ExceptionsHandler } from '@core/helpers/Exceptions.handler';
import { PrismaService } from '@db/prisma/prisma.service';
import { CreateResponse } from '@core/helpers/createResponse';
import { NotificationsCreate_UC } from '@notifications/useCases/notificationsCreate.use-case';
import { NotificationsGetAll_UC } from '@notifications/useCases/notificationsGetAll.use-case';
import { DeleteNotification_UC } from '@notifications/useCases/notificationsDelete.use-case';
import { NotificationsRead_UC } from '@notifications/useCases/notificationsRead.use-case';
import { Create_Notification_Dto } from '@notifications/dto/create-notification.dto';
import { Pagination_Dto } from '@core/dto/pagination.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { NotificationTemplate_Enum } from '@notifications/interfaces/notifications.interfaces';
import { RequestType_Enum } from '@ac-requests/interfaces/accountRequests.inteface';

@Injectable()
export class NotificationsService {

  private readonly logger = new Logger('NotificationsService');

  constructor(
    private readonly prismaService: PrismaService,
    private readonly exceptionsHandler: ExceptionsHandler,
  ) {
  }

  notificationTemplateByAccountRequest(type: RequestType_Enum): NotificationTemplate_Enum {
    switch (type) {
      case RequestType_Enum.CONFIRM_ACCOUNT:
        return NotificationTemplate_Enum.CREATE_ACCOUNT;
        break;
      case RequestType_Enum.RESET_PASSWORD:
        return NotificationTemplate_Enum.RESET_PASSWORD;
        break;
      case RequestType_Enum.CHANGE_EMAIL:
        return NotificationTemplate_Enum.CHANGE_EMAIL;
        break;
      default:
        break;
    }
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
      this.logger.error(`[Notification Create] Error: `, error);
      this.exceptionsHandler.EmitException(error, 'NotificationsService.create');
    }

  }

  async get_all(user_auth: Session_Auth_I, pagination: Pagination_Dto) {

    try {

      const notifications = await NotificationsGetAll_UC(user_auth.user, pagination, this.prismaService);

      return CreateResponse({
        ok: true,
        statusCode: HttpStatus.OK,
        message: 'Notifications found',
        data: notifications.data,
        paginator: notifications.meta
      })

    } catch (error) {
      this.logger.error(`[Notification Get All] Error: `, error);
      this.exceptionsHandler.EmitException(error, 'NotificationsService.get_all');
    }

  }

  async read_notification(id: number, user_auth: Session_Auth_I) {

    try {

      const notification = await this.prismaService.$transaction(async (prisma) => {
        return await NotificationsRead_UC(id, user_auth.user, prisma);
      });

      return CreateResponse({
        ok: true,
        statusCode: HttpStatus.OK,
        message: 'Notificación leida',
        data: notification
      })

    } catch (error) {
      this.logger.error(`[Notification Read] Error: `, error);
      this.exceptionsHandler.EmitException(error, 'NotificationsService.read_notification');
    }

  }

  async delete_notification(id: number, user_auth: Session_Auth_I) {

    try {

      const notification = await this.prismaService.$transaction(async (prisma) => {
        return await DeleteNotification_UC(id, user_auth.user, prisma);
      });

      return CreateResponse({
        ok: true,
        statusCode: HttpStatus.OK,
        message: 'Notificación eliminada',
        data: notification
      });

    } catch (error) {
      this.logger.error(`[Notification Delete] Error: `, error);
      this.exceptionsHandler.EmitException(error, 'NotificationsService.delete_notification');
    }

  }

}