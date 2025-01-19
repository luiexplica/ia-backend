import { Prisma } from "@prisma/client";
import { Create_Notification_Dto } from "@notifications/dto/create-notification.dto";

export const NotificationsCreate_UC = async (create_notification: Create_Notification_Dto, prisma: Prisma.TransactionClient) => {

  const notification = await prisma.notifications_Ety.create({
    data: {
      // subject: create_notification.subject,
      // message: create_notification.message,
      ...create_notification,
      user: {
        connect: {
          id: create_notification.user
        }
      }
    }
  });

  return notification;

}