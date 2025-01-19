import { Prisma } from '@prisma/client';

export const AuthGetById_UC = async (id: string, prisma: Prisma.TransactionClient) => {

  const auth = await prisma.auth_Ety.findUnique({
    where: {
      id
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