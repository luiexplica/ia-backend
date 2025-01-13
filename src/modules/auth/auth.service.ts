import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ExceptionsHandler } from '@core/helpers/Exceptions.handler';
import { AuthRegister_Dto } from './dto/register-user.dto';
import { EntityManager } from '@mikro-orm/core';
import { AuthRegister_UC } from './useCases/authRegister.use-case';
import { CreateResponse } from '@core/helpers/createResponse';
import { LoginAuth_Dto } from './dto/login-user.dto';
import { AuthLogin_UC } from './useCases/authLogin.use-case';
import { JwtService } from '@nestjs/jwt';
import { JWT_Payload_I } from './interfaces/jwt-payload.interface';
import { Auth_Ety } from './entities/auth.entity';


@Injectable()
export class AuthService {

  private readonly logger = new Logger('AuthService');
  ExceptionsHandler = new ExceptionsHandler();

  constructor(
    private readonly em: EntityManager,
    private readonly jwtService: JwtService,
  ) {

  }

  // async delete(id: string) {

  //   const f_em = this.em.fork();

  //   try {

  //     const auth = await f_em.findOne(Auth_Ety, { _id: id });
  //     await f_em.remove(auth);

  //     f_em.flush();

  //     return CreateResponse({
  //       ok: true,
  //       message: 'Usuario eliminado correctamente',
  //       statusCode: HttpStatus.OK,
  //     })

  //   } catch (error) {

  //     this.logger.error(`[Auth Delete] Error: ${error}`);
  //     this.ExceptionsHandler.EmitException(error, 'AuthService.delete');

  //   }

  // }

  async register(register: AuthRegister_Dto) {

    const f_em = this.em.fork();

    try {

      const new_auth = await AuthRegister_UC(register, f_em);
      f_em.flush();

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

  async signJWT(payload: JWT_Payload_I) {
    return this.jwtService.sign(payload)
  }

  async login(login: LoginAuth_Dto) {

    const f_em = this.em.fork();

    try {

      let user = await AuthLogin_UC(login, f_em);
      delete user.password;
      const token = await this.signJWT({
        _id: user._id,
        email: user.email,
        role: user.role,
        user: user._id,
        username: user.username ?? '',
      });

      f_em.flush();

      return CreateResponse({
        ok: true,
        data: {
          ...user,
          token
        },
        message: 'Usuario logueado correctamente',
        statusCode: HttpStatus.OK,
      })

    } catch (error) {

      this.logger.error(`[Auth Login] Error: ${error}`);
      this.ExceptionsHandler.EmitException(error, 'AuthService.login');

    }

  }

}
