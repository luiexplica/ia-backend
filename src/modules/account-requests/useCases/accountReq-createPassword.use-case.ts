import { Prisma, $Enums } from '@prisma/client';
import { Create_Password_Request_Dto } from '@ac-requests/dto/create-password-request.dto';

interface Create_Request_Key_I {
  create: Create_Password_Request_Dto;
  key: string;
  auth_id: string;
}

export const AccountReqCreatePass_UC = async ({ create, key, auth_id }: Create_Request_Key_I, prisma: Prisma.TransactionClient) => {

  const request_created = await prisma.accountRequests_Ety.create({
    data: {
      detail: create.email,
      type: $Enums.RequestType_Enum.RESET_PASSWORD,
      key: key,
      auth: {
        connect: {
          id: auth_id,
        },
      },
    },
    omit: {
      key: true,
      auth_id: true,
      id: true,
    },
    include: {
      auth: {
        select: {
          user: {
            select: {
              name: true,
            }
          },
          email: true
        }
      }
    }
  });

  return request_created;

}