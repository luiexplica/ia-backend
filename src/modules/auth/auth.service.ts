import { PrismaService } from './../../database/prisma/prisma.service';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ExceptionsHandler } from '@core/helpers/Exceptions.handler';
import { AuthRegister_Dto } from './dto/register-user.dto';
import { AuthRegister_UC } from './useCases/authRegister.use-case';
import { CreateResponse } from '@core/helpers/createResponse';
import { LoginAuth_Dto } from './dto/login-user.dto';
import { AuthLogin_UC } from './useCases/authLogin.use-case';
import { JwtService } from '@nestjs/jwt';
import { JWT_Payload_I } from './interfaces/jwt-payload.interface';
import { envs } from '../../core/config/envs';
@Injectable()
export class AuthService {

  private readonly logger = new Logger('AuthService');
  ExceptionsHandler = new ExceptionsHandler();

  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService
  ) {

  }

  async register(register: AuthRegister_Dto) {

    // const f_em = this.em.fork();
    try {

      const new_auth = await this.prismaService.$transaction(async (prisma) => {
        const new_auth = await AuthRegister_UC(register, prisma);
        return new_auth;
      });

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

      this.logger.error(`[Auth Register] Error: ${error}`);
      this.ExceptionsHandler.EmitException(error, 'AuthService.register');

    }

  }

  async signJWT(payload: JWT_Payload_I) {
    return this.jwtService.sign(payload)
  }

  async renewToken(token: string) {

        try {

            const { sub, iat, exp, ...user } = this.jwtService.verify(token, {
                secret: envs.jwtSecret
            });

            return CreateResponse({
                ok: true,
                statusCode: HttpStatus.OK,
                message: 'Token verificado',
                data: {
                    ...user,
                    token: await this.signJWT(user)
                },
            })

        } catch (error) {

            this.logger.error(`[ Renew token ] Error: ${error}`);
            this.ExceptionsHandler.EmitException(error, 'AuthService.renewToken');

        }

  }

  async login(login: LoginAuth_Dto) {

    try {

      let auth = await this.prismaService.$transaction( async (prisma) => {
        return await AuthLogin_UC(login, prisma);
      } );

      delete auth.password;
      const token = await this.signJWT({
        id: auth.id,
        email: auth.email,
        role: auth.role,
        user: auth.user.id,
        username: auth.username ?? '',
      });

      return CreateResponse({
        ok: true,
        data: {
          ...auth,
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
