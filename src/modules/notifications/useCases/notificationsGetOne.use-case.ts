import { Prisma } from "@prisma/client";

export const NotificationsGetOne_UC = async (id: number, user_id: string, prisma: Prisma.TransactionClient) => {

  const notification = await prisma.notifications_Ety.findFirst({
    where: {
      id: id,
      user_id: user_id
    }
  });

  return notification ?? null;

}