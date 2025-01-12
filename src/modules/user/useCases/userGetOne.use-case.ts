import { EntityManager } from "@mikro-orm/core";
import { User_Ety } from "../entities/user.entity";
import { CreateResponse } from "../../../core/helpers/createResponse";
import { HttpException, HttpStatus } from "@nestjs/common";


const isUserNotExist = async (auth_id: string, em: EntityManager): Promise<User_Ety> => {

  const repository = em.getRepository(User_Ety);
  const user = await repository.findOne({
    auth: {
      _id: auth_id
    }
  },
  // {
  //   populate: [
  //     'auth',
  //     'auth._id',
  //   ],
  //   fields: ['*', 'auth._id']
  // }
  );

  if (!user) {
    const resp = CreateResponse({
      ok: false,
      data: null,
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'El usuario no existe',
    })
    throw new HttpException(resp, resp.statusCode);

  }

  return user;

}

export const UserGetOne_UseCase = async (auth_id: string, em: EntityManager): Promise<User_Ety> => {

  const user = isUserNotExist(auth_id, em);

  return user;

}