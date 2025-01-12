
import { SchemaKey_I } from "@core/interfaces";
import { Auth_I } from "@auth/interfaces/auth.interface";

export enum Gender_Enum {
  MALE = "MALE",
  FEMALE = "FEMALE",
  NONE = "NONE",
}

export interface User_I extends SchemaKey_I {
  name: string;
  last_name: string;
  gender?: Gender_Enum;
  phone?: string;
  auth: Auth_I;
  // profile: Profile_I | string;

  updated_at?: Date;
}