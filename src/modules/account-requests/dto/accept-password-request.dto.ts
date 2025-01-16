import { IsString, Matches } from "class-validator";


export class Accept_Password_Request_Dto {

    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, {
        message: 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number',
    })
    password: string;
}