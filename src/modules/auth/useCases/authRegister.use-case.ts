import { HttpException, HttpStatus } from "@nestjs/common";
import { AuthRegister_Dto } from "../dto/register-user.dto";
import { EntityManager } from "@mikro-orm/core";
import { Auth_Ety } from "../entities/auth.entity";
import * as uuid from 'uuid';
import * as bcrypt from 'bcrypt';
import { CreateResponse } from "@core/helpers/createResponse";
import { GetAuthByEmail_UseCase } from "./getAuthByEmail.use-case";

const isValidRegisterRole = (role: string): void => {
  if (role === 'ADMIN_ROLE') {
    const resp = CreateResponse({
        ok: false,
        data: null,
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Rol no permitido',
    })
    throw new HttpException( resp ,resp.statusCode );
  }
};

const isValidEmailExists = async (email: string, em: EntityManager): Promise<void> => {

  const user = await GetAuthByEmail_UseCase(email, em);

  if (user) {
    const resp = CreateResponse({
        ok: false,
        data: null,
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'El email ya está registrado',
    })
    throw new HttpException( resp ,resp.statusCode );
  }

}

export const AuthRegister_UseCase = async (AuthRegister_Dto: AuthRegister_Dto, em: EntityManager): Promise<Auth_Ety> => {

  const {
    email,
    password,
    role
  } = AuthRegister_Dto;

  await isValidEmailExists(email, em);
  isValidRegisterRole(role);

  const repository = em.getRepository(Auth_Ety);

  let new_auth = await repository.create_auth({
    save: {
      _id: uuid.v4(),
      email,
      role,
      password: bcrypt.hashSync(password, 10),
      // user: uuid.v4()
    },
    _em: em
  });

  return new_auth;

}