import { PrismaClient } from "@prisma/client";
import { CreateResponse } from "@core/helpers/createResponse";
import { HttpException, HttpStatus } from "@nestjs/common";

const isNotExistConversation = () => {
  const resp = CreateResponse({
    ok: false,
    statusCode: HttpStatus.NOT_FOUND,
    message: 'Conversación no encontrada',
    data: null
  });
  throw new HttpException(resp, resp.statusCode);
}

export const GptGetMessages_UC = async (id: string, user_id: string, prisma: PrismaClient) => {

  const conversation = await prisma.ia_conversation_Ety.findFirst({
    where: {
      id,
      user_id
    },
    include: {
      gpt_messages: true
    }
  })

  if (!conversation) {
    isNotExistConversation();
  }

  const messages = [...conversation.gpt_messages];

  return messages;

}