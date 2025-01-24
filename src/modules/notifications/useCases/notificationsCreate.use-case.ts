import { Prisma } from "@prisma/client";
import { Create_Notification_Dto } from "@notifications/dto/create-notification.dto";
import { NotificationTemplate_Enum } from "@notifications/interfaces/notifications.interfaces";
import { NotificationCreatedAccount_Template } from "@notifications/templates/notificationCreatedAccount.template";
import { NotificationChangeEmail_Template } from "@notifications/templates/notificationChangeEmail.template";
import { NotificationResetPassword_Template } from "@notifications/templates/notificationResetPass.template";

export const NotificationsCreate_UC = async (create: Create_Notification_Dto, prisma: Prisma.TransactionClient) => {

  if (create.template === NotificationTemplate_Enum.CREATE_ACCOUNT) {
    const templateContain = await NotificationCreatedAccount_Template();
    create = {
      ...create,
      ...templateContain
    }
  }

  if (create.template === NotificationTemplate_Enum.CHANGE_EMAIL) {
    const templateContain = await NotificationChangeEmail_Template();
    create = {
      ...create,
      ...templateContain
    }
  }
  if (create.template === NotificationTemplate_Enum.RESET_PASSWORD) {
    const templateContain = await NotificationResetPassword_Template();
    create = {
      ...create,
      ...templateContain
    }
  }

  const notification = await prisma.notifications_Ety.create({
    data: {
      subject: create.subject,
      message: create.message,
      template: create.template,
      user: {
        connect: {
          id: create.user
        }
      }
    }
  });

  return notification;

}