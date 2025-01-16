
import { IsEmail } from "class-validator";


export class Create_Password_Request_Dto {

    @IsEmail()
    email: string;

}