import { Injectable, Logger } from '@nestjs/common';
import { UpdateUser_Dto } from './dto/update-user.dto';
import { ExceptionsHandler } from '@core/helpers/Exceptions.handler';
import { UserGetOne_UC } from './useCases/userGetOne.use-case';
import { CreateResponse } from '@core/helpers/createResponse';
import { Session_Auth_I } from '@auth/interfaces/auth.interface';
import { UserUpdate_UC } from './useCases/userUpdate.use-case';
import { UserGetAll_UC } from './useCases/userGetAll.use-case';
import { Pagination_Dto } from '@core/dto/pagination.dto';
import { PrismaService } from '@db/prisma/prisma.service';
import { Response_I } from '@core/interfaces/response.interface';
import { user_Ety } from '@prisma/client';


export const USER_SERVICE_TOKEN = 'USER_SERVICE';

@Injectable()
export class UserService {

  private readonly logger = new Logger('UserService');

  constructor(
    private readonly prismaService: PrismaService,
    private readonly exceptionsHandler: ExceptionsHandler
  ) {

  }

  async getOne(id: string) {

    try {

      const user = await UserGetOne_UC(id, this.prismaService);

      return CreateResponse({
        ok: true,
        data: user,
        statusCode: 200,
        message: 'Usuario encontrado correctamente',
      });

    } catch (error) {

      this.logger.error(`[User Get One] Error: `, error);
      this.exceptionsHandler.EmitException(error, 'UserService.getOne');

    }

  }

  async updateUser(UpdateUser_Dto: UpdateUser_Dto, Auth_user: Session_Auth_I): Promise<Response_I<user_Ety>> {

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

      this.logger.error(`[User Update] Error: `, error);
      this.exceptionsHandler.EmitException(error, 'UserService.updateUser');

    }

  }

  async getUsers(paginationDto: Pagination_Dto): Promise<Response_I<user_Ety[]>> {

    try {

      const users = await UserGetAll_UC(paginationDto, this.prismaService);

      return CreateResponse({
        ok: true,
        statusCode: 200,
        message: 'Usuarios encontrados correctamente',
        data: users.data,
        paginator: users.meta
      });

    } catch (error) {

      this.logger.error(`[User Get Users] Error: `, error);
      this.exceptionsHandler.EmitException(error, 'UserService.getUsers');

    }

  }

}
