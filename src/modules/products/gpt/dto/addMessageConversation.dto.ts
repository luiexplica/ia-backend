import { IsString } from "class-validator";


export class Gpt_AddMessageConversation_Dto {

  // @IsString()
  // conversation_id: string;

  @IsString()
  msg: string;


}