import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityManager } from '@mikro-orm/core';
import { ExceptionsHandler } from '@core/helpers/Exceptions.handler';
import { UserGetOne_UseCase } from './useCases/userGetOne.use-case';
import { CreateResponse } from '../../core/helpers/createResponse';

@Injectable()
export class UserService {

  private readonly logger = new Logger('UserService');
  ExceptionsHandler = new ExceptionsHandler();

  constructor(
    private readonly em: EntityManager,

  ){

  }

  async getOne(_id: string) {

    const f_em = this.em.fork();

    try {

      const user = await UserGetOne_UseCase(_id, f_em);

      return CreateResponse({
        ok: true,
        data: user,
        statusCode: 200,
        message: 'Usuario encontrado correctamente',
      })

    } catch (error) {

      this.logger.error(`[User Get One] Error: ${error}`);
      this.ExceptionsHandler.EmitException(error, 'UserService.getOne');

    }

  }

}
