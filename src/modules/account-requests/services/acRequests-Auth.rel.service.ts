import { Injectable, Logger } from "@nestjs/common";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { PrismaService } from "../../../database/prisma/prisma.service";
import { AuthService } from "../../auth/auth.service";



@Injectable()
export class AccountRequestsAuth_Rel_Service {

  private readonly logger = new Logger('AccountRequestsAuth_Rel_Service');

  constructor(
    private readonly prismaService: PrismaService,
    private readonly exceptionsHandler: ExceptionsHandler,
    private readonly eventEmitter: EventEmitter2,

    // private readonly authService: AuthService

  ) {

  }


}