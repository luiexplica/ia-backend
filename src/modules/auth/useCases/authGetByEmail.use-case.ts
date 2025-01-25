import { Prisma } from '@prisma/client';

export const AuthGetByEmail_UC = async (email: string, prisma: Prisma.TransactionClient) => {

  const auth = await prisma.auth_Ety.findUnique({
    where: {
      email
    },
    // include: {
    //   user: {
    //     select: {
    //       id: true,
    //     },
    //   },
    // },
  });
  return auth ?? null;

}