import { HttpException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { CreateResponse } from "@core/helpers/createResponse";
import { NotificationsGetOne_UC } from "./notificationsGetOne.use-case";

const isNotFound = () => {
  const resp = CreateResponse({
    ok: false,
    statusCode: 404,
    message: 'Notificación no encontrada'
  });
  throw new HttpException(resp, resp.statusCode);
}

export const DeleteNotification_UC = async (id: number, user_id: string, prisma: Prisma.TransactionClient) => {

  const notification = await NotificationsGetOne_UC(id, user_id, prisma);

  if (!notification) {
    isNotFound()
  }

  const deleted_notification = await prisma.notifications_Ety.delete({
    where: {
      id: id,
      user_id: user_id
    }
  });

  return deleted_notification;

}