import { HttpException, HttpStatus } from "@nestjs/common";
import { CreateResponse } from "@core/helpers/createResponse";
import { Prisma } from "@prisma/client";
import { AuthGetByEmail_UC } from "./authGetByEmail.use-case";
import { AuthRegister_Dto } from "@luiexplica/ia-dev-services";
import * as bcrypt from 'bcryptjs';

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

const isValidEmailExists = async (email: string, prisma: Prisma.TransactionClient): Promise<void> => {

  const user = await AuthGetByEmail_UC(email, prisma);

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

export const AuthRegister_UC = async (AuthRegister_Dto: AuthRegister_Dto, prisma: Prisma.TransactionClient) => {

  const {
    name,
    last_name,
    email,
    password,
    // role
  } = AuthRegister_Dto;

  await isValidEmailExists(email, prisma);
  // isValidRegisterRole(role);
  const salt = bcrypt.genSaltSync(10);
  const auth = await prisma.auth_Ety.create({
    data: {
      email,
      // role,
      password: bcrypt.hashSync(password, salt),
      user: {
        create: {
          name,
          last_name,
        }
      }
    },
    include: {
      user: true
    }
  })

  return {
    ...auth,
    password: '****'
  };

}