
import { SchemaKey_I } from '@core/interfaces/index';

export enum AuthStatus_Enum {
  VERIFIED = "VERIFIED",
  BLOCKED = "BLOCKED",
  DELETED = "DELETED",
  SUSPENDED = "SUSPENDED",
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export enum User_Role_Enum {
  ADMIN_ROLE = "ADMIN_ROLE",
  SUPPORT_ROLE = "SUPPORT_ROLE",
  CLIENT_ROLE = "CLIENT_ROLE",
}

export interface Auth_I extends SchemaKey_I {

  email: string;
  password: string;
  username: string;

  created_at?: Date;
  updated_at?: Date;
  last_session: Date;

  status?: AuthStatus_Enum;
  role: User_Role_Enum;
  // user: User_I | string;

  // requests?: Requests_I[]

}

export interface Session_Auth_I extends SchemaKey_I {
  email: string;
  created_at: Date;
  status: string;
  user: string;
  role: User_Role_Enum;
  token: string;
}