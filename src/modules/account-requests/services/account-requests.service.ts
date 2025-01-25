import { Emailing_Evh_Payload } from '@emailing/services/emailing-eventHandler.service';
import { Notifications_Evh_Enum, Notifications_Evh_Payload } from '@notifications/services/notifications-eventHandler.service';
import { AccountReqCreatePass_UC } from '@ac-requests/useCases/accountReq-createPassword.use-case';
import { AccountReqCreate_UC } from '@ac-requests/useCases/accountReq-create.use-case';
import { Session_Auth_I } from '@auth/interfaces/auth.interface';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@db/prisma/prisma.service';
import { Create_Request_Key_Dto } from '@ac-requests/dto/create-request-key.dto';
import { ExceptionsHandler } from '@core/helpers/Exceptions.handler';
import { CreateResponse } from '@core/helpers/createResponse';
import { Create_Password_Request_Dto } from '@ac-requests/dto/create-password-request.dto';
import { AccountReqGet_UC } from '@ac-requests/useCases/accountReq-get.use-case';
import { AccountReqVerify_UC, AccountReqVerifyPass_UC } from '../useCases/accountReq-verify.use-case';
import { Accept_Password_Request_Dto } from '../dto/accept-password-request.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Emailing_Evh_Enum } from '@emailing/services/emailing-eventHandler.service';
import { Prisma } from '@prisma/client';
import * as keygen from 'keygen';


@Injectable()
export class AccountRequestsService {

  private readonly logger = new Logger('UserService');

  constructor(
    private readonly prismaService: PrismaService,
    private readonly exceptionsHandler: ExceptionsHandler,
    private readonly eventEmitter: EventEmitter2,

    // private readonly authService: AuthService

  ) {

  }

  async create_requestByAuth(create_request_dto: Create_Request_Key_Dto, auth: Partial<Session_Auth_I>, prismaClient?: Prisma.TransactionClient) {

    try {

      const prisma = prismaClient || this.prismaService;

      const key = keygen.url(175);
      const request = await AccountReqCreate_UC({
        create: create_request_dto,
        key,
        auth_id: auth.id
      }, prisma);

      this.eventEmitter.emit(Notifications_Evh_Enum.CREATE_BY_REQUEST, {
        user: auth.user,
        type: request.type,
      } as Notifications_Evh_Payload[Notifications_Evh_Enum.CREATE_BY_REQUEST])

      this.eventEmitter.emit(Emailing_Evh_Enum.SEND_BY_REQUEST, {
        key,
        name: request.auth.user.name,
        detail: create_request_dto?.detail || '',
        typeRequest: request.type,
        to: request.auth.email
      } as Emailing_Evh_Payload[Emailing_Evh_Enum.SEND_BY_REQUEST])

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

      const auth = await this.prismaService.auth_Ety.findFirst({
        where: {
          email: create_request_dto.email
        }
      });
      // const {data: auth} = await this.authService.getOneByEmail(create_request_dto.email);

      if (auth) {

        const key = keygen.url(175);
        const request = await AccountReqCreatePass_UC({
          create: create_request_dto,
          key,
          auth_id: auth.id
        }, this.prismaService)

        this.eventEmitter.emit(Notifications_Evh_Enum.CREATE_BY_REQUEST, {
          user: auth.user_id,
          type: request.type,
        } as Notifications_Evh_Payload[Notifications_Evh_Enum.CREATE_BY_REQUEST])

        this.eventEmitter.emit(Emailing_Evh_Enum.SEND_BY_REQUEST, {
          key,
          name: request.auth.user.name,
          detail: create_request_dto.email || '',
          typeRequest: request.type,
          to: request.auth.email
        } as Emailing_Evh_Payload[Emailing_Evh_Enum.SEND_BY_REQUEST])

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
