import { Prisma } from "@prisma/client";
import { NotificationsGetOne_UC } from "./notificationsGetOne.use-case";
import { CreateResponse } from "@core/helpers/createResponse";
import { TempoHandler } from "@core/helpers/TempoHandler";
import { HttpException } from "@nestjs/common";

const isNotFound = () => {
  const resp = CreateResponse({
    ok: false,
    statusCode: 404,
    message: 'Notificación no encontrada'
  });
  throw new HttpException(resp, resp.statusCode);
}

export const NotificationsRead_UC = async (id: number, user_id: string, prisma: Prisma.TransactionClient) => {

  const notification = await NotificationsGetOne_UC(id, user_id, prisma);

  if (!notification) {
    isNotFound()
  }

  const updated_notification = await prisma.notifications_Ety.update({
    where: {
      id: id,
      user_id: user_id
    },
    data: {
      read_at: new TempoHandler().date_now(),
      state: 'READ'
    }
  });

  return updated_notification;

}