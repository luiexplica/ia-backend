import { PrismaService } from '@db/prisma/prisma.service';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ExceptionsHandler } from '@core/helpers/Exceptions.handler';
import { AuthRegister_Dto } from '@auth/dto/register-user.dto';
import { AuthRegister_UC } from '@auth/useCases/authRegister.use-case';
import { CreateResponse } from '@core/helpers/createResponse';
import { LoginAuth_Dto } from '@auth/dto/login-user.dto';
import { AuthLogin_UC } from '@auth/useCases/authLogin.use-case';
import { JwtService } from '@nestjs/jwt';
import { JWT_Payload_I } from '@auth/interfaces/jwt-payload.interface';
import { envs } from '@core/config/envs';
import { AuthDeleteAccount_UC } from '@auth/useCases/authDeleteAccount.use-case';
import { AccountRequestsService } from '@ac-requests/account-requests.service';
import { RequestType_Enum } from '@ac-requests/interfaces/accountRequests.inteface';
import { Response_I } from '@core/interfaces/response.interface';
import { auth_Ety } from '@prisma/client';
import { AuthConfigService } from './authConfig.service';

export interface AuthService_I {
  getOneByEmail(email: string): Promise<Response_I<auth_Ety>>;
  delete(auth_id: string): Promise<Response_I<any>>;
  register(register: AuthRegister_Dto): Promise<Response_I<auth_Ety>>;
  signJWT(payload: JWT_Payload_I): Promise<string>;
  renewToken(token: string): Promise<Response_I<Partial<JWT_Payload_I>>>;
  login(login: LoginAuth_Dto): Promise<Response_I<auth_Ety>>;
}

@Injectable()
export class AuthService {

  private readonly logger = new Logger('AuthService');

  constructor(

    private readonly prismaService: PrismaService,
    private readonly exceptionsHandler: ExceptionsHandler,
    private readonly authConfigService: AuthConfigService,
    private readonly accountrequestsService: AccountRequestsService,

  ) {

  }

  async delete(auth_id: string) {

    try {

      const resp = await this.prismaService.$transaction(async (prisma) => {
        return await AuthDeleteAccount_UC(auth_id, prisma);
      });

      return CreateResponse<Partial<typeof resp>>({
        ok: true,
        message: 'Usuario eliminado correctamente',
        statusCode: HttpStatus.OK,
        data: {
          email: resp.email,
          id: resp.id
        }
      });

    } catch (error) {

      this.logger.error(`[Auth Delete] Error: `, error);
      this.exceptionsHandler.EmitException(error, 'AuthService.delete');

    }

  }

  async register(register: AuthRegister_Dto) {

    try {

      const new_auth = await this.prismaService.$transaction(async (prisma) => {

        const auth = await AuthRegister_UC(register, prisma);
        await this.accountrequestsService.create_requestByAuth({ type: RequestType_Enum.CONFIRM_ACCOUNT }, {
          user: auth.user_id,
          id: auth.id,
          email: auth.email,
        }, prisma);

        return auth;

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

      this.logger.error(`[Auth Register] Error: `, error);
      this.exceptionsHandler.EmitException(error, 'AuthService.register');

    }

  }

  async renewToken(token: string) {

    try {

      const {
        // sub,
        //  iat,
        // exp,
        token: new_token,
        user
      } = await this.authConfigService.verify(token);

      return CreateResponse({
        ok: true,
        statusCode: HttpStatus.OK,
        message: 'Token verificado',
        data: {
          ...user,
          token: new_token
        },
      })

    } catch (error) {

      this.logger.error(`[ Renew token ] Error: `, error);
      this.exceptionsHandler.EmitException(error, 'AuthService.renewToken');

    }

  }

  async login(login: LoginAuth_Dto) {

    try {

      let auth = await this.prismaService.$transaction(async (prisma) => {
        return await AuthLogin_UC(login, prisma);
      });

      delete auth.password;
      const token = await this.authConfigService.signJWT({
        id: auth.id,
        email: auth.email,
        role: auth.role,
        user: auth.user_id,
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

      this.logger.error(`[Auth Login] Error: `, error);
      this.exceptionsHandler.EmitException(error, 'AuthService.login');

    }

  }

}
