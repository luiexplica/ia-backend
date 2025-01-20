import { AccountReqCreatePass_UC } from '@ac-requests/useCases/accountReq-createPassword.use-case';
import { AccountReqCreate_UC } from '@ac-requests/useCases/accountReq-create.use-case';
import { Session_Auth_I } from '@auth/interfaces/auth.interface';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@db/prisma/prisma.service';
import { Create_Request_Key_Dto } from '@ac-requests/dto/create-request-key.dto';
import { ExceptionsHandler } from '@core/helpers/Exceptions.handler';
import { CreateResponse } from '@core/helpers/createResponse';
import { Create_Password_Request_Dto } from '@ac-requests/dto/create-password-request.dto';
import { AccountReqGet_UC } from '@ac-requests/useCases/accountReq-get.use-case';
import { AccountReqVerify_UC, AccountReqVerifyPass_UC } from './useCases/accountReq-verify.use-case';
import { Accept_Password_Request_Dto } from './dto/accept-password-request.dto';
import { AuthGetByEmail_UC } from '@auth/useCases/authGetByEmail.use-case';
import * as keygen from 'keygen';

@Injectable()
export class AccountRequestsService {

  private readonly logger = new Logger('UserService');

  constructor(
    private readonly prismaService: PrismaService,
    private readonly exceptionsHandler: ExceptionsHandler

  ) {

  }

  async create_requestByAuth(create_request_dto: Create_Request_Key_Dto, user_auth: Partial<Session_Auth_I>) {

    try {

      const key = keygen.url(175);
      const request = await this.prismaService.$transaction(async (prisma) => {
        return await AccountReqCreate_UC({
          create: create_request_dto,
          key,
          auth_id: user_auth.id
        }, prisma)
      })

      return CreateResponse({
        ok: true,
        statusCode: 201,
        message: 'Solicitud creada',
        data: {
          ...request,
        }
      });

    } catch (error) {

      this.logger.error(`[Create request by auth] Error: `, error);
      this.exceptionsHandler.EmitException(error, 'AccountRequestsService.create_requestByAuth');

    }

  }

  async create_password_request(create_request_dto: Create_Password_Request_Dto) {

    try {

      const auth = await AuthGetByEmail_UC(create_request_dto.email, this.prismaService);

      if (auth) {

        const key = keygen.url(175);
        await this.prismaService.$transaction(async (prisma) => {
          return await AccountReqCreatePass_UC({
            create: create_request_dto,
            key,
            auth_id: auth.id
          }, prisma)
        })

      }

      return CreateResponse({
        ok: true,
        statusCode: 201,
        message: 'Si su correo está registrado, le será enviado las instrucciones para restablecer la contraseña',
        data: null
      });

    } catch (error) {

      this.logger.error(`[Create password request] Error: `, error);
      this.exceptionsHandler.EmitException(error, 'AccountRequestsService.create_password_request');

    }

  }

  async get_request(key: string) {

    try {

      const request = await AccountReqGet_UC(key, this.prismaService);

      return CreateResponse({
        ok: true,
        statusCode: 200,
        message: 'Solicitud encontrada',
        data: {
          ...request
        }
      });

    } catch (error) {

      this.logger.error(`[Get request] Error: `, error);
      this.exceptionsHandler.EmitException(error, 'AccountRequestsService.get_request');

    }

  }

  async verify_request(key: string) {

    try {

      const resp = await this.prismaService.$transaction(async (prisma) => {
        return await AccountReqVerify_UC(key, prisma)
      })

      // return CreateResponse(resp);
      return resp

    } catch (error) {

      this.logger.error(`[Verify request] Error: `, error);
      this.exceptionsHandler.EmitException(error, 'AccountRequestsService.verify_request');

    }

  }

   async verify_pass_request(key: string, Accept_Password_Request_Dto: Accept_Password_Request_Dto) {

    try {

      const { password } = Accept_Password_Request_Dto;

      const resp = await this.prismaService.$transaction(async (prisma) => {
        return await AccountReqVerifyPass_UC(key, password, prisma)
      });

      return CreateResponse({
        ...resp
      });


    } catch (error) {

      this.logger.error(`[Verify pass request] Error: `, error);
      this.exceptionsHandler.EmitException(error, 'AccountRequestsService.verify_pass_request');

    }

   }

}
