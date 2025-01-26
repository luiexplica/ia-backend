import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@db/prisma/prisma.service';
import { ExceptionsHandler } from '@core/helpers/Exceptions.handler';
import  OpenAI  from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources';

@Injectable()
export class GptService {

  private readonly logger = new Logger('GptService');

   private _openAi = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

  constructor(
    private readonly prismaService: PrismaService,
    private readonly exceptionsHandler: ExceptionsHandler
  ) {

  }

  async createConversation(createGptDto: any) {

    try {

      const msg: ChatCompletionMessageParam = {
        role: "user",
        content: createGptDto.msg
      }

      const completion = await this._openAi.chat.completions.create({
        model: "gpt-4o-mini",
        store: true,
        messages: [
             {
                role: "system",
                content: `
                    Se te dará un mensaje de conversación con alguna solicitud de información o incluso una pregunta o conversación cordial
                    Debes responderle de la manera más natural y amable posible.
                `
            },
            msg,
        ],
      });

      return completion;

    } catch (error) {

      this.logger.error(`[Gpt CreateConversation] Error: `, error);
      this.exceptionsHandler.EmitException(error, 'GptService.createConversation');

    }

  }

}
