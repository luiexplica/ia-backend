import { IA_Conversation_I } from './../../interfaces/product-conversation.interface';
import { User_I } from "@user/interfaces/user.interface";

export enum Gpt_Role_Enum {
  SYSTEM = "system",
  USER = "user",
  ASSISTANT = "assistant",
}

export interface Gpt_message_I {
  id: string;
  role: Gpt_Role_Enum;
  content: string;
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  created_at?: Date;
  finish_reason: string;
  ia_conversation?: IA_Conversation_I
  ia_conversation_id: string;
}