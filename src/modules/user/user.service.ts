import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUser_Dto } from './dto/update-user.dto';
import { EntityManager } from '@mikro-orm/core';
import { ExceptionsHandler } from '@core/helpers/Exceptions.handler';
import { UserGetOne_UC } from './useCases/userGetOne.use-case';
import { CreateResponse } from '../../core/helpers/createResponse';
import { Session_Auth_I } from '../auth/interfaces/auth.interface';
import { UserUpdate_UC } from './useCases/userUpdate.use-case';
import { UserGetAll_UC } from './useCases/userGetAll.use-case';

@Injectable()
export class UserService {

  private readonly logger = new Logger('UserService');
  ExceptionsHandler = new ExceptionsHandler();

  constructor(
    private readonly em: EntityManager,

  ) {

  }

  async getOne(_id: string) {

    const f_em = this.em.fork();

    try {

      const user = await UserGetOne_UC(_id, f_em);

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

    const f_em = this.em.fork();

    try {

      const user = await UserUpdate_UC(Auth_user.user, UpdateUser_Dto, f_em);

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

  async getUsers() {

    const f_em = this.em.fork();

    try {

      const users = UserGetAll_UC(f_em);



    } catch (error) {

      this.logger.error(`[User Get Users] Error: ${error}`);
      this.ExceptionsHandler.EmitException(error, 'UserService.getUsers');
    }

  }

}
