import { Prisma } from '@prisma/client';
import { UpdateUser_Dto } from "@user/dto/update-user.dto";
import { handleUserNotFound } from "./utils/HandleUserNotFound";

export const UserUpdate_UC = async (user_id: string, UpdateUser_Dto: UpdateUser_Dto, prisma: Prisma.TransactionClient) => {

  const user = await prisma.user_Ety.findFirst({
    where: {
      id: user_id,
    }
  })

  if (!user) {
    handleUserNotFound()
  }

  const updated_user = await prisma.user_Ety.update({
    where: user,
    data: {
      ...UpdateUser_Dto
    }
  })

  return updated_user;

}

