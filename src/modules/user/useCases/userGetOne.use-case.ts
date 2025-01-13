import { EntityManager } from "@mikro-orm/core";
import { User_Ety } from "../entities/user.entity";
import { CreateResponse } from "../../../core/helpers/createResponse";
import { HttpException, HttpStatus } from "@nestjs/common";
import { handleUserNotFound } from "./utils/HandleUserNotFound";


export const UserGetOne_UC = async (auth_id: string, em: EntityManager): Promise<User_Ety> => {
  const repository = em.getRepository(User_Ety);
  const user = await repository.findOne({
    auth: {
      _id: auth_id,
    },
  });

  if (!user) {
    handleUserNotFound();
  }

  return user;
};