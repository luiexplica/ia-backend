import { Prisma } from '@prisma/client';
import { Injectable, Logger } from '@nestjs/common';
import { UpdateUser_Dto } from './dto/update-user.dto';
import { EntityManager } from '@mikro-orm/core';
import { ExceptionsHandler } from '@core/helpers/Exceptions.handler';
import { UserGetOne_UC } from './useCases/userGetOne.use-case';
import { CreateResponse } from '@core/helpers/createResponse';
import { Session_Auth_I } from '@auth/interfaces/auth.interface';
import { UserUpdate_UC } from './useCases/userUpdate.use-case';
import { UserGetAll_UC } from './useCases/userGetAll.use-case';
import { Pagination_Dto } from '@core/dto/pagination.dto';
import { PrismaService } from '@db/prisma/prisma.service';

@Injectable()
export class UserService {

  private readonly logger = new Logger('UserService');
  ExceptionsHandler = new ExceptionsHandler();

  constructor(
    private readonly em: EntityManager,
    private readonly prismaService: PrismaService

  ) {

  }

  async getOne(_id: string) {

    try {

      const user = await UserGetOne_UC(_id, this.prismaService);

      return CreateResponse({
        ok: true,
        data: user,
        statusCode: 200,
        message: 'Usuario encontrado correctamente',
      });

    } catch (error) {

      this.logger.error(`[User Get One] Error: ${error}`);
      this.ExceptionsHandler.EmitException(error, 'UserService.getOne');

    }

  }

  async updateUser(UpdateUser_Dto: UpdateUser_Dto, Auth_user: Session_Auth_I) {

    try {

      // const user = await UserUpdate_UC(Auth_user.user, UpdateUser_Dto, f_em);
      const user = await this.prismaService.$transaction(async (prisma) => {
        return await UserUpdate_UC(Auth_user.user, UpdateUser_Dto, prisma);
      })

      return CreateResponse({
        ok: true,
        data: user,
        statusCode: 200,
        message: 'Usuario actualizado correctamente',
      });

    } catch (error) {

      this.logger.error(`[User Update] Error: ${error}`);
      this.ExceptionsHandler.EmitException(error, 'UserService.updateUser');

    }

  }

  async getUsers(paginationDto: Pagination_Dto) {

    try {

      const users = await UserGetAll_UC(paginationDto, this.prismaService);

      return CreateResponse({
        ok: true,
        statusCode: 200,
        message: 'Usuarios encontrados correctamente',
        data: users,
        // paginator: users.meta
      });

    } catch (error) {

      this.logger.error(`[User Get Users] Error: ${error}`);
      this.ExceptionsHandler.EmitException(error, 'UserService.getUsers');

    }

  }

}
