import { EntityManager } from "@mikro-orm/core";
import { UpdateUser_Dto } from "@user/dto/update-user.dto";
import { User_Ety } from "@user/entities/user.entity";
import { handleUserNotFound } from "./utils/HandleUserNotFound";

export const UserUpdate_UC = async (user_id: string, UpdateUser_Dto: UpdateUser_Dto, em: EntityManager) => {

  const repository = em.getRepository(User_Ety);
  const user = await repository.findOne({
    _id: user_id
  });

  if (!user) {
    handleUserNotFound()
  }

  const updated_user = await repository.update_user({ find: user, update: UpdateUser_Dto, _em: em });

  return updated_user;

}

