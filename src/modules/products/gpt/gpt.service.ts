import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@db/prisma/prisma.service';
import { ExceptionsHandler } from '@core/helpers/Exceptions.handler';
import { IA_CreateConversation_Dto } from '../dto/createConversation.dto';
import { Session_Auth_I } from '@auth/interfaces/auth.interface';
import { GptInitConversation_UC } from './useCases/gptCreate.use-case';
import { envs } from '@core/config/envs';
import OpenAI from 'openai';
import { CreateResponse } from '@core/helpers/createResponse';
import { Gpt_AddMessageConversation_Dto } from './dto/addMessageConversation.dto';
import { GptAddMessage_UC } from './useCases/gptAddMessage.use-case';

@Injectable()
export class GptService {

  private readonly logger = new Logger('GptService');

  private _openAi = new OpenAI({
    apiKey: envs.openai_api_key,
  });

  constructor(
    private readonly prismaService: PrismaService,
    private readonly exceptionsHandler: ExceptionsHandler
  ) {

  }

  async createConversation(createGptDto: IA_CreateConversation_Dto, User_Auth: Session_Auth_I) {

    try {

      const completion = await GptInitConversation_UC(this._openAi, createGptDto, User_Auth, this.prismaService);

      return CreateResponse({
        ok: true,
        statusCode: HttpStatus.CREATED,
        message: 'Conversación creada',
        data: {
          ...completion
        }
      })

    } catch (error) {

      this.logger.error(`[Gpt CreateConversation] Error: `, error);
      this.exceptionsHandler.EmitException(error, 'GptService.createConversation');

    }

  }

  async addMessage( id: string, addMessageDto: Gpt_AddMessageConversation_Dto, User_Auth: Session_Auth_I ) {

    try {

      const completion = await GptAddMessage_UC({
        openai: this._openAi,
        conversation_id: id,
        addMessageDto,
        User_Auth,
        prisma: this.prismaService
      });

      // return messages;

        return CreateResponse({
        ok: true,
        statusCode: HttpStatus.CREATED,
        data: {
          ...completion
        }
      })

    } catch (error) {

      this.logger.error(`[Gpt AddMessage] Error: `, error);
      this.exceptionsHandler.EmitException(error, 'GptService.addMessage');

    }

  }

}
