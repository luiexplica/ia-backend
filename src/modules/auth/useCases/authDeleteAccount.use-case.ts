import { Prisma } from "@prisma/client";
import { AuthGetById_UC } from "./authGetById.use-case";
import { CreateResponse } from "@core/helpers/createResponse";
import { HttpException, HttpStatus } from "@nestjs/common";

const isNotExist = () => {
  const resp = CreateResponse({
    ok: false,
    data: null,
    statusCode: HttpStatus.NOT_FOUND,
    message: 'La cuenta de usuario no existe',
  });
  throw new HttpException(resp, resp.statusCode);
}

export const AuthDeleteAccount_UC = async (auth_id: string, prisma: Prisma.TransactionClient) => {

  const auth = await AuthGetById_UC(auth_id, prisma);

  if (!auth) {
    isNotExist();
  }

  // await prisma.auth_Ety.deleteMany({
  await prisma.auth_Ety.delete({
    where: {
      id: auth_id
      // email: 'alvarosego01@gmail.com'
    }
  });

  return auth;

}