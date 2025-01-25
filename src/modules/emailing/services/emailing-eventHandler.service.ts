
import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { EmailingService } from "./emailing.service";
import { Create_EmailByRequest_I } from "@emailing/interfaces/emailing.interface";

export enum Emailing_Evh_Enum {
  SEND_BY_REQUEST = "Emailing.sendByRequest",
}

export type Emailing_Evh_Payload = {
  [Emailing_Evh_Enum.SEND_BY_REQUEST]: Create_EmailByRequest_I
}

@Injectable()
export class EmailingEventHandlerService {

  constructor(
    private readonly EmailingService: EmailingService,
  ) { }

  @OnEvent(Emailing_Evh_Enum.SEND_BY_REQUEST, { async: true })
  async createNotification_RegisteredEvent(payload: Emailing_Evh_Payload[Emailing_Evh_Enum.SEND_BY_REQUEST]) {
    return await this.EmailingService.send_emailByRequest(payload);
  }

}