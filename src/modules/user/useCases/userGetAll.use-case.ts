import { EntityManager } from "@mikro-orm/core";
import { User_Ety } from "../entities/user.entity";


export const UserGetAll_UC = async (em: EntityManager) => {

  const repository = em.getRepository(User_Ety);

  const users = await repository.find_all({
    find: {},
  });

}