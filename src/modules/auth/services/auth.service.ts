import { PrismaService } from '@db/prisma/prisma.service';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ExceptionsHandler } from '@core/helpers/Exceptions.handler';
import { AuthRegister_UC } from '@auth/useCases/authRegister.use-case';
import { CreateResponse } from '@core/helpers/createResponse';
import { AuthLogin_UC } from '@auth/useCases/authLogin.use-case';
import { AuthDeleteAccount_UC } from '@auth/useCases/authDeleteAccount.use-case';
import { AccountRequestsService } from '@ac-requests/account-requests.service';
import { AuthRegister_Dto, JWT_Payload_I, LoginAuth_Dto, RequestType_Enum, Response_I, Session_Response_I, User_Role_Enum } from '@luiexplica/ia-dev-services';
import { auth_Ety } from '@prisma/client';
import { AuthConfigService } from './authConfig.service';
import { AuthGetById_UC } from '../useCases/authGetById.use-case';

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
          id: auth.id,
          user: auth.user_id,
          email: auth.email
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
        user: sessionAuth
      } = await this.authConfigService.verify(token);

      const {user} = await AuthGetById_UC(sessionAuth.id, this.prismaService);

      return CreateResponse<Session_Response_I>({
        ok: true,
        statusCode: HttpStatus.OK,
        message: 'Token verificado',
        data: {
          auth: {
          ...sessionAuth,
          token: new_token
          },
          client: {
            name: user.name,
            last_name: user.last_name,
            profile_pic: 'pic'
          }
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
        role: auth.role as User_Role_Enum,
        user: auth.user_id,
        username: auth.username ?? '',
      });

      return CreateResponse<Session_Response_I>({
        ok: true,
        data: {
          auth: {
          id: auth.id,
          email: auth.email,
          role: auth.role as User_Role_Enum,
          user: auth.user_id,
          username: auth.username ?? '',
          token
          },
          client: {
            name: auth.user.name,
            last_name: auth.user.last_name,
            profile_pic: 'pic'
          }
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
