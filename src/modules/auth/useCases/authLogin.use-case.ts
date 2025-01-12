import { EntityManager } from "@mikro-orm/core";
import { LoginAuth_Dto } from "@auth/dto/login-user.dto";
import { Auth_Ety } from "@auth/entities/auth.entity";
import { GetAuthByEmail_UseCase } from "./getAuthByEmail.use-case";
import { HttpStatus, HttpException } from "@nestjs/common";
import { CreateResponse } from "@core/helpers/createResponse";
import * as bcrypt from 'bcrypt';
import { UpdateLastSession_UseCase } from "./updateLastSession.use-case";

const isValidPassword = (password: string, authPassword: string) => {

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

const isValidEmailNotExist = async (email: string, em: EntityManager): Promise<Auth_Ety> => {

  const user = await GetAuthByEmail_UseCase(email, em);

  if (!user) {
    const resp = CreateResponse({
      ok: false,
      data: null,
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'El email no existe o contraseña incorrecta',
    })
    throw new HttpException(resp, resp.statusCode);

  }

  return user;

}

export const AuthLogin_UseCase = async (login: LoginAuth_Dto, em: EntityManager): Promise<Auth_Ety> => {

  const {
    email,
    password
  } = login;

  const user = await isValidEmailNotExist(email, em);
  isValidPassword(password, user.password);
  const now_user = await UpdateLastSession_UseCase(email, em);


  return {
    ...now_user,
    password: '****'
  };

}