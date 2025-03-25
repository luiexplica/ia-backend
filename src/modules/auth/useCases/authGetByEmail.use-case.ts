import { Prisma } from '@prisma/client';

export const AuthGetByEmail_UC = async (email: string, prisma: Prisma.TransactionClient) => {

  const auth = await prisma.auth_Ety.findUnique({
    where: {
      email
    },
     include: {
      user: {
        select: {
          name: true,
          last_name: true
        },
      },
    },
  });
  return auth ?? null;

}