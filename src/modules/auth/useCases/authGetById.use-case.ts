import { Prisma } from '@prisma/client';

export const AuthGetById_UC = async (id: string, prisma: Prisma.TransactionClient) => {
  const auth = await prisma.auth_Ety.findUnique({
    where: {
      id
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