import { $Enums, PrismaClient } from "@prisma/client";
import { ChatCompletion, ChatCompletionMessageParam } from "openai/resources";
import { IA_CreateConversation_Dto } from "@products/dto/createConversation.dto";
import { Session_Auth_I } from "@auth/interfaces/auth.interface";
import OpenAI from "openai";
import * as uuid from 'uuid';


interface GptInitStoreConversation_UC_I {
  msg: ChatCompletionMessageParam,
  conversation_id: string;
  completion: ChatCompletion,
  User_Auth: Session_Auth_I,
  prisma: PrismaClient
}

const GptInitStoreConversation_UC = async ({
  msg,
  conversation_id,
  completion,
  User_Auth,
  prisma
}: GptInitStoreConversation_UC_I) => {

  const {
    choices,
    id: gpt_id,
    usage
  } = completion;

  const choice = choices[0];
  const conversation = await prisma.ia_conversation_Ety.create({
    data: {
      id: conversation_id,
      gpt_messages: {
        createMany: {
          data: [
            {
              gpt_id: 'initial_' + gpt_id,
              content: msg.content as string,
              role: msg.role,
              completion_tokens: 0,
              prompt_tokens: 0,
              total_tokens: 0,
              finish_reason: 'initial',
            },
            {
              gpt_id,
              content: choice.message.content,
              finish_reason: choice.finish_reason,
              role: choice.message.role,
              completion_tokens: usage.completion_tokens,
              prompt_tokens: usage.prompt_tokens,
              total_tokens: usage.total_tokens,
            }
          ]
        }
      },
      type: $Enums.IA_Type_Enum.GPT,
      model: completion.model as string,
      user: {
        connect: {
          id: User_Auth.user
        }
      },
    }
  });

}

export const GptInitConversation_UC = async (openai: OpenAI, createGptDto: IA_CreateConversation_Dto, User_Auth: Session_Auth_I, prisma: PrismaClient) => {

  const conversation_id: string = uuid.v4();

  const msg: ChatCompletionMessageParam = {
    role: "user",
    content: createGptDto.msg
  }

  const model = "gpt-4o-mini";

  const completion = await openai.chat.completions.create({
    model,
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

  await GptInitStoreConversation_UC({
    msg,
    conversation_id,
    completion,
    User_Auth,
    prisma: prisma
  });

  return {
    conversation_id,
    completion: completion.choices[0].message.content
  };

}
