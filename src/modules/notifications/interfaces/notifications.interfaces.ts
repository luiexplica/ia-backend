import { SchemaKey_I } from "@core/interfaces";
import { User_I } from "@user/interfaces/user.interface";

export enum NotificationState_Enum {
  READ = "READ",
  UNREAD = "UNREAD",
}

export enum NotificationTemplate_Enum {
  CREATE_ACCOUNT = "CREATE_ACCOUNT",
  RESET_PASSWORD = "RESET_PASSWORD",
  CHANGE_EMAIL = "CHANGE_EMAIL",
  INFO = "INFO",
}

export interface Notifications_I extends SchemaKey_I {

  state: NotificationState_Enum;
  template: NotificationTemplate_Enum;
  subject: string;
  message: string;
  user?: User_I;
  user_id: string;
  created_at?: Date;
  read_at?: Date;

}

