import { Auth_Ety, Prisma } from '@prisma/client';
import { EntityManager } from "@mikro-orm/core";


export const GetAuthByEmail_UC = async (email: string, prisma: Prisma.TransactionClient) => {

  const auth = await prisma.auth_Ety.findUnique({
    where: {
      email
    },
    include: {
      user: {
        select: {
          id: true,
        },
      },
    },
  });
  return auth ?? null;

}