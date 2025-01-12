import { User_Role_Enum } from "./auth.interface";

export interface JWT_Payload_I {

  _id: string;
  email: string;
  role: User_Role_Enum;

}