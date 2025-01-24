import { handleUserNotFound } from "./utils/HandleUserNotFound";
import { PrismaService } from '@db/prisma/prisma.service';


export const UserGetOne_UC = async (auth_id: string, prisma: PrismaService) => {

  const user = await prisma.user_Ety.findFirst({
    where: {
      auth: {
        id: auth_id,
      },
    },
    include: {
      auth: {
        select: {
          id: true,
          email: true,
          username: true,
          role: true,
          status: true,
        },
      },

    },

  })

  if (!user) {
    handleUserNotFound();
  }

  return user;
};