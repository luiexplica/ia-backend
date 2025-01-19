import { SchemaKey_I } from "@core/interfaces";
import { Auth_I } from "@auth/interfaces/auth.interface";

export enum RequestType_Enum {
  CONFIRM_ACCOUNT = "CONFIRM_ACCOUNT",
  RESET_PASSWORD = "RESET_PASSWORD",
  CHANGE_EMAIL = "CHANGE_EMAIL"
}
export enum RequestStatus_Enum {
  PENDING = "PENDING",
  USED = "USED",
  EXPIRED = "EXPIRED"
}
export interface Requests_I extends SchemaKey_I {
  type: RequestType_Enum;
  key: string;
  status: RequestStatus_Enum;
  auth?: Auth_I;
  auth_id: string;
  detail?: string;
  created_at?: Date;
  used_at?: Date;
}
