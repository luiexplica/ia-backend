import { Prisma } from '@prisma/client';
import { HttpStatus, HttpException } from "@nestjs/common";
import { CreateResponse } from "@core/helpers/createResponse";
import { UpdateLastSession_UC } from "./updateLastSession.use-case";
import { AuthGetByEmail_UC } from './authGetByEmail.use-case';
import { LoginAuth_Dto } from '@luiexplica/ia-dev-services';
import * as bcrypt from 'bcryptjs';

const isValidPassword = async (password: string, authPassword: string) => {

  const isPassValid = bcrypt.compareSync(password, authPassword);

  if (!isPassValid) {
    const resp = CreateResponse({
      ok: false,
      data: null,
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'El email no existe o contraseña incorrecta',
    })
    throw new HttpException(resp, resp.statusCode);
  }

}

const isValidEmailNotExist = async (user: any) => {

  if (!user) {
    const resp = CreateResponse({
      ok: false,
      data: null,
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'El email no existe o contraseña incorrecta',
    })
    throw new HttpException(resp, resp.statusCode);

  }

}

export const AuthLogin_UC = async (login: LoginAuth_Dto, prisma: Prisma.TransactionClient) => {

  const {
    email,
    password
  } = login;

  const auth = await AuthGetByEmail_UC(email, prisma);

  await isValidEmailNotExist(auth);
  await isValidPassword(password, auth.password);
  const now_user = await UpdateLastSession_UC(email, prisma);

  return {
    ...auth,
    last_session: now_user.last_session,
    password: '****'
  };

}