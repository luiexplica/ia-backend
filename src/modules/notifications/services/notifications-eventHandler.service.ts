import { Inject, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { NOTIFICATIONS_SERVICE_TOKEN, NotificationsService } from "./notifications.service";
import { Create_Notification_Dto } from "@notifications/dto/create-notification.dto";


export enum Notifications_Evh_Enum {
  CREATE = "notifications.create",
}

export type Notifications_Evh_Payload = {
  [Notifications_Evh_Enum.CREATE]: Create_Notification_Dto;
}

@Injectable()
export class NotificationsEventHandlerService {

  constructor(
    @Inject(NOTIFICATIONS_SERVICE_TOKEN)
    private readonly notificationsService: NotificationsService,
  ) { }

  @OnEvent( Notifications_Evh_Enum.CREATE , { async: true })
  async createNotification_RegisteredEvent(payload: Notifications_Evh_Payload['notifications.create']) {
    return await this.notificationsService.create(payload);
  }

}