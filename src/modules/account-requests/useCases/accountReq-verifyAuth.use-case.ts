import { AccountRequests_Ety, Prisma } from '@prisma/client';
import { CreateResponse } from '../../../core/helpers/createResponse';
import { HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

const confirmAccount = async (request: AccountRequests_Ety, prisma: Prisma.TransactionClient) => {

  const updated_auth = await prisma.auth_Ety.updateManyAndReturn({
    where: {
      id: request.auth_id
    },
    data: {
      status: 'ACTIVE'
    },
    omit: {
      password: true
    }
  });

  return CreateResponse({
    ok: true,
    statusCode: HttpStatus.OK,
    message: 'Cuenta confirmada',
    data: {
      ...updated_auth
    }
  })

}

export const changeEmail = (request: AccountRequests_Ety, prisma: Prisma.TransactionClient) => {

  const updated_auth = prisma.auth_Ety.updateManyAndReturn({
    where: {
      id: request.auth_id
    },
    data: {
      email: request.detail
    },
    omit: {
      password: true
    }
  });

  return CreateResponse({
    ok: true,
    statusCode: HttpStatus.OK,
    message: 'Cambio de email realizado',
    data: {
      ...updated_auth
    }
  })

}

export const AccountReqAuth_UC = async (request: AccountRequests_Ety, prisma: Prisma.TransactionClient) => {

  if(request.type === 'CONFIRM_ACCOUNT') return confirmAccount(request, prisma);
  if(request.type === 'CHANGE_EMAIL') return changeEmail(request, prisma);

}

export const AccountReqAuthPassword_UC = async (password: string, auth_id: string, prisma: Prisma.TransactionClient) => {

  const new_password = await bcrypt.hashSync(password, 10);

  const updated_auth = await prisma.auth_Ety.updateManyAndReturn({
    where: {
      id: auth_id
    },
    data: {
      password: new_password
    },
    omit: {
      password: true
    }
  });

  return CreateResponse({
    ok: true,
    statusCode: HttpStatus.OK,
    message: 'Contraseña cambiada',
    data: {
      ...updated_auth
    }
  });

}