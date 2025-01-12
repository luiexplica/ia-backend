import { HttpException, HttpStatus } from "@nestjs/common";
import { AuthRegister_Dto } from "../dto/register-user.dto";
import { Response_I } from "@core/interfaces/response.interface";
import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core";
import { Auth_Ety } from "../entities/auth.entity";
import * as uuid from 'uuid';
import * as bcrypt from 'bcrypt';
import { CreateResponse } from "@core/helpers/createResponse";
import { Auth_ormRepository } from "../entities/auth.repository.service";

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

const isValidEmailExists = async (email: string, repository: Auth_ormRepository): Promise<void> => {

  const user = await repository.findOne({ email });

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

export const AuthRegister_UseCase = async (AuthRegister_Dto: AuthRegister_Dto, _em: EntityManager): Promise<Auth_Ety> => {

  const {
    email,
    password,
    role
  } = AuthRegister_Dto;

  const repository = _em.getRepository(Auth_Ety);
  await isValidEmailExists(email, repository);
  isValidRegisterRole(role);

  let new_auth = await repository.create_auth({
    save: {
      _id: uuid.v4(),
      email,
      role,
      password: bcrypt.hashSync(password, 10),
      // user: uuid.v4()
    },
    _em
  });

  return new_auth;

}