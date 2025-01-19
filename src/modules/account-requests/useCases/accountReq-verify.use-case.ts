import { accountRequests_Ety, Prisma } from '@prisma/client';
import { AccountReqGet_UC } from './accountReq-get.use-case';
import { CreateResponse } from '@core/helpers/createResponse';
import { HttpStatus, HttpException } from '@nestjs/common';
import { AccountReqAuth_UC, AccountReqAuthPassword_UC } from './accountReq-verifyAuth.use-case';
import { TempoHandler } from '@core/helpers/TempoHandler';

const isRequestUsed = () => {

  const resp = CreateResponse({
    ok: false,
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Solicitud ya usada',
    data: null
  })
  throw new HttpException(resp, resp.statusCode);

}

const isNotPermittedRequest = () => {

  const resp = CreateResponse({
    ok: false,
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Solicitud no permitida',
    data: null
  })
  throw new HttpException(resp, resp.statusCode);
}

const useRequest = async (request: accountRequests_Ety, prisma: Prisma.TransactionClient) => {

  await prisma.accountRequests_Ety.update({
    where: {
      id: request.id
    },
    data: {
      status: 'USED',
      used_at: new TempoHandler().date_now()
    }
  });

}

export const AccountReqVerify_UC = async (key: string, prisma: Prisma.TransactionClient) => {

  const request = await AccountReqGet_UC(key, prisma);

  if (request.status === 'USED') isRequestUsed();
  if (!(request.type === 'CONFIRM_ACCOUNT' || request.type === 'CHANGE_EMAIL')) isNotPermittedRequest();

  const resp = await AccountReqAuth_UC(request, prisma);

  await useRequest(request, prisma);

  return resp;

}

export const AccountReqVerifyPass_UC = async (key: string, password: string, prisma: Prisma.TransactionClient) => {

  const request = await AccountReqGet_UC(key, prisma);
  if (request.status === 'USED') isRequestUsed();

  if(request.type !== 'RESET_PASSWORD') isNotPermittedRequest();

  const resp = await AccountReqAuthPassword_UC(password, request.auth_id, prisma);

  await useRequest(request, prisma);

  return resp;

}