import { Auth_Ety, Prisma } from '@prisma/client';
import { LoginAuth_Dto } from "@auth/dto/login-user.dto";
import { GetAuthByEmail_UC } from "./getAuthByEmail.use-case";
import { HttpStatus, HttpException } from "@nestjs/common";
import { CreateResponse } from "@core/helpers/createResponse";
import * as bcrypt from 'bcrypt';
import { UpdateLastSession_UC } from "./updateLastSession.use-case";

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

  const auth = await GetAuthByEmail_UC(email, prisma);

  await isValidEmailNotExist(auth);
  await isValidPassword(password, auth.password);
  const now_user = await UpdateLastSession_UC(email, prisma);

  return {
    ...auth,
    last_session: now_user.last_session,
    password: '****'
  };

}