import { Prisma } from '@prisma/client';
import { CreateResponse } from '../../../core/helpers/createResponse';
import { HttpException, HttpStatus } from '@nestjs/common';


const isNotExistRequest = () => {

  const resp = CreateResponse({
    ok: false,
    statusCode: HttpStatus.NOT_FOUND,
    message: 'Solicitud no encontrada',
    data: null
  })
  throw new HttpException(resp, resp.statusCode);

}

export const AccountReqGetReq_UC = async (key: string, prisma: Prisma.TransactionClient) => {

  const request = await prisma.accountRequests_Ety.findFirst({
    where: {
      key
    }
  })

  if (!request) {
    isNotExistRequest()
  }

  return request;

}