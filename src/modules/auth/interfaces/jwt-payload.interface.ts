import { $Enums } from "@prisma/client";
import { User_Role_Enum } from "./auth.interface";

export interface JWT_Payload_I {

  id: string;
  email: string;
  role: User_Role_Enum | $Enums.User_Role_Enum;
  username: string;
  user: string;

}