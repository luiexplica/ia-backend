
import { IsDate, IsEmail, IsEnum, IsOptional, IsUUID } from "class-validator";
import { Type } from "class-transformer";
import { AuthStatus_Enum, User_Role_Enum } from "@auth/interfaces/auth.interface";

export class Auth_User_I_Dto {

    @IsUUID(4, { message: 'Invalid UUID' })
    _id: string;

    @IsEmail()
    email: string;

    @IsEnum(AuthStatus_Enum, {
        message: `status must be one of the following values: ${{ ...AuthStatus_Enum }}`
    })
    status: string;

    @IsEnum(User_Role_Enum, {
        message: `role must be one of the following values: ${{ ...User_Role_Enum }}`
    })
    role: string;

    @IsUUID(4, { message: 'Invalid UUID' })
    user: string;

    @Type(() => Date)
    @IsDate()
    created_at: Date;

    @IsOptional()
    token?: string;

}