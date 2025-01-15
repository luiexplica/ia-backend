import { Prisma } from '@prisma/client';
import { User_Ety } from "@user/entities/user.entity";
import { handlerNoResults } from "@core/helpers/handlerNoResults";
import { Pagination_Dto } from "@core/dto/pagination.dto";
import { PrismaService } from '../../../database/prisma/prisma.service';

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