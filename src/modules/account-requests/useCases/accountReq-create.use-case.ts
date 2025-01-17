import { Prisma } from '@prisma/client';
import { Create_Request_Key_Dto } from "@ac-requests/dto/create-request-key.dto";

interface Create_Request_Key_I {
  create: Create_Request_Key_Dto;
  key: string;
  auth_id: string;
}

export const AccountReqCreate_UC = async ({create, key, auth_id}: Create_Request_Key_I, prisma: Prisma.TransactionClient) => {

  const request_created = await prisma.accountRequests_Ety.create({
    data: {
      type: create.type,
      detail: create.detail,
      key: key,
      auth: {
        connect: {
          id: auth_id,
        },
      },
    },
    omit: {
      key: true,
      id: true,
    },
  });

  return request_created;

}