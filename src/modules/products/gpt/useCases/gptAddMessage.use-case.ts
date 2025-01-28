import { Gpt_AddMessageConversation_Dto } from '@gpt/dto/addMessageConversation.dto';
import { Prisma, PrismaClient } from "@prisma/client";
import { Session_Auth_I } from "@auth/interfaces/auth.interface";
import { GptGetMessages_UC } from './gptGetMessages.use-case';

import OpenAI from "openai";
import { ChatCompletion, ChatCompletionMessageParam } from 'openai/resources';

interface GptAddMessage_UC_I {
  openai: OpenAI,
  conversation_id: string,
  addMessageDto: Gpt_AddMessageConversation_Dto,
  User_Auth: Session_Auth_I,
  prisma: PrismaClient
}

export const GptAddMessage_UC = async ({
  openai,
  conversation_id,
  addMessageDto,
  User_Auth,
  prisma
}: GptAddMessage_UC_I) => {

  const messages = await GptGetMessages_UC(conversation_id, User_Auth.user, prisma);
  let msgContext: ChatCompletionMessageParam[] = [];

  for (const [i, element] of messages.entries()) {
    msgContext.push({
      role: element.role as any,
      content: element.content
    })
  }

  const new_msg: ChatCompletionMessageParam = {
    role: "user",
    content: addMessageDto.msg
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
      ...msgContext,
      new_msg
    ],
  });

  await GptAddStoreConversation_UC({
    msg: new_msg,
    conversation_id,
    completion,
    User_Auth,
    prisma
  })

  return {
    conversation_id,
    completion: completion.choices[0].message.content
  }

}

interface GptAddStoreConversation_UC_I {
  msg: ChatCompletionMessageParam,
  conversation_id: string;
  completion: ChatCompletion,
  User_Auth: Session_Auth_I,
  prisma: PrismaClient
}

const GptAddStoreConversation_UC = async ({
  msg,
  conversation_id,
  completion,
  User_Auth,
  prisma
}: GptAddStoreConversation_UC_I) => {

  const {
    choices,
    id: gpt_id,
    usage
  } = completion;

  const choice = choices[0];

  const messages: Prisma.gpt_message_EtyCreateManyInput[] = [
    {
        gpt_id: 'user_' + gpt_id,
        content: msg.content as string,
        role: msg.role as string,
        completion_tokens: 0,
        prompt_tokens: 0,
        total_tokens: 0,
        finish_reason: 'sent',
        ia_conversation_id: conversation_id
    },
    {
        gpt_id,
        content: choice.message.content as string,
        role: choice.message.role as string,
        completion_tokens: usage.completion_tokens,
        prompt_tokens: usage.prompt_tokens,
        total_tokens: usage.total_tokens,
        finish_reason: choice.finish_reason,
        ia_conversation_id: conversation_id
    }
  ];

  await prisma.gpt_message_Ety.createManyAndReturn({
      data: messages
  })

}




/*

  REQUISITOS:

  insta web, boton de pago

  requisitos:
    banco mercantil y banesco cuenta juridica , banco mercantil soporta todo


 */