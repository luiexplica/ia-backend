import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { NotificationsService } from "./notifications.service";
import { RequestType_Enum } from "@ac-requests/interfaces/accountRequests.inteface";


export enum Notifications_Evh_Enum {
  CREATE_BY_REQUEST = "notifications.createByRequest",
}

export type Notifications_Evh_Payload = {
  [Notifications_Evh_Enum.CREATE_BY_REQUEST]: { user: string, type: RequestType_Enum };
}

@Injectable()
export class NotificationsEventHandlerService {

  constructor(
    private readonly notificationsService: NotificationsService,
  ) { }

  @OnEvent(Notifications_Evh_Enum.CREATE_BY_REQUEST, { async: true })
  async createNotification_ByNotification_Event(payload: Notifications_Evh_Payload[Notifications_Evh_Enum.CREATE_BY_REQUEST]) {

    const template = this.notificationsService.notificationTemplateByAccountRequest(payload.type);
    return await this.notificationsService.create({
      user: payload.user,
      template
    });

  }

}