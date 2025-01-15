import { handleUserNotFound } from "./utils/HandleUserNotFound";
import { PrismaService } from '@db/prisma/prisma.service';


export const UserGetOne_UC = async (auth_id: string, prisma: PrismaService) => {

  const user = await prisma.user_Ety.findFirst({
    where: {
      auth: {
        id: auth_id,
      },
    }
  })

  if (!user) {
    handleUserNotFound();
  }

  return user;
};