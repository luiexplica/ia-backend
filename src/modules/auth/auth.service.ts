import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ExceptionsHandler } from '@core/helpers/Exceptions.handler';
import { AuthRegister_Dto } from './dto/register-user.dto';
import { EntityManager } from '@mikro-orm/core';
import { AuthRegister_UseCase } from './useCases/authRegister.use-case';
import { CreateResponse } from '@core/helpers/createResponse';


@Injectable()
export class AuthService {

  private readonly logger = new Logger('AuthService');
  ExceptionsHandler = new ExceptionsHandler();

  constructor(
    private readonly em: EntityManager,
  ) {

  }

  async register(register: AuthRegister_Dto) {

    const f_em = this.em.fork();

    try {

      const new_auth = await AuthRegister_UseCase(register, f_em);
      // f_em.flush();

      return CreateResponse({
        ok: true,
        data: {
          ...new_auth,
          password: '****'
        },
        message: 'Usuario creado correctamente',
        statusCode: HttpStatus.CREATED,
      })

    } catch (error) {

      console.log('sale poracá', error);
      this.logger.error(`[Auth Register] Error: ${error}`);
      this.ExceptionsHandler.EmitException(error, 'AuthService.register');

    }

  }

}
