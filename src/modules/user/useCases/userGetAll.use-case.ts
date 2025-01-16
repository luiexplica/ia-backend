import { Prisma, User_Ety } from '@prisma/client';
import { handlerNoResults } from "@core/helpers/handlerNoResults";
import { Pagination_Dto } from "@core/dto/pagination.dto";
import { PrismaService } from '@db/prisma/prisma.service';

export const UserGetAll_UC = async ( Pagination_Dto: Pagination_Dto, prisma: PrismaService) => {

  const users = await prisma.find_pagination<User_Ety, Prisma.User_EtyFindManyArgs>( {
    model: prisma.user_Ety,
    pagination: Pagination_Dto,
  } );

  if(users.data.length === 0){
    handlerNoResults();
  }

  return users;

}