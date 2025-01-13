import { HttpException, HttpStatus } from "@nestjs/common";
import { AuthRegister_Dto } from "../dto/register-user.dto";
import { EntityManager } from "@mikro-orm/core";
import { Auth_Ety } from "../entities/auth.entity";
import * as bcrypt from 'bcrypt';
import { CreateResponse } from "@core/helpers/createResponse";
import { GetAuthByEmail_UC } from "./getAuthByEmail.use-case";

const isValidRegisterRole = (role: string): void => {
  if (role === 'ADMIN_ROLE') {
    const resp = CreateResponse({
      ok: false,
      data: null,
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Rol no permitido',
    })
    throw new HttpException(resp, resp.statusCode);
  }
};

const isValidEmailExists = async (email: string, em: EntityManager): Promise<void> => {

  const user = await GetAuthByEmail_UC(email, em);

  if (user) {
    const resp = CreateResponse({
      ok: false,
      data: null,
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'El email ya está registrado',
    })
    throw new HttpException(resp, resp.statusCode);
  }

}

export const AuthRegister_UC = async (AuthRegister_Dto: AuthRegister_Dto, em: EntityManager): Promise<AuthRegister_Dto> => {

  const {
    name,
    last_name,
    email,
    password,
    role
  } = AuthRegister_Dto;

  await isValidEmailExists(email, em);
  isValidRegisterRole(role);

  const repository = em.getRepository(Auth_Ety);

  await repository.create_auth({
    save: {
      email,
      role,
      password: bcrypt.hashSync(password, 10),
      user: {
        name,
        last_name,
      }
    },
    _em: em
  });

  return AuthRegister_Dto;

}