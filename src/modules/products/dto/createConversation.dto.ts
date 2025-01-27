import { IsEnum, IsOptional, IsString } from "class-validator";
import OpenAI from "openai";
import { IA_Type } from "../interfaces/product-conversation.interface";


export class IA_CreateConversation_Dto {

  @IsString()
  msg: string;

  @IsEnum(IA_Type, {
    message: `Service must be one of the following values: ${{ ...IA_Type }}`
  })
  service?: IA_Type;

}