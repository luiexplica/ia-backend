import { User_I } from "@user/interfaces/user.interface";
import { Gpt_message_I } from "../gpt/interfaces/gpt.interface";

export enum IA_Type {
  GPT = "GPT",
}

export interface IA_Conversation_I {
  id: string;
  type: IA_Type;
  model: string;
  gpt_messages?: Gpt_message_I[];
  user?: User_I;
  user_id: string;
  created_at?: Date;
  updated_at?: Date;
}
