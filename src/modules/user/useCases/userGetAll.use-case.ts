import { EntityManager } from "@mikro-orm/core";
import { User_Ety } from "@user/entities/user.entity";
import { handlerNoResults } from "@core/helpers/handlerNoResults";
import { Pagination_I } from "@core/helpers/pagination.meta";
import { Pagination_Dto } from "@core/dto/pagination.dto";


export const UserGetAll_UC = async ( Pagination_Dto: Pagination_Dto, em: EntityManager): Promise<Pagination_I<User_Ety>> => {

  const repository = em.getRepository(User_Ety);

  const users = await repository.find_all({
    find: {},
    pagination: {
      ...Pagination_Dto
    },
    _em: em
  });

  if(users.data.length === 0){
    handlerNoResults();
  }

  return users;

}