
import { IsString, IsEmail, IsStrongPassword, MinLength, IsOptional, IsEnum, Matches } from 'class-validator';
import { User_Role_Enum } from '@auth/interfaces/auth.interface';
import { Expose } from 'class-transformer';
import { envs } from '@core/config/envs';

export class AuthRegister_Dto {

  @IsString()
  @MinLength(3)
  // @Expose({ name: 'firstName' })
  name: string;

  @IsString()
  @MinLength(3)
  last_name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsEnum(User_Role_Enum, {
    message: `Role must be one of the following values: ${{ ...User_Role_Enum }}`
  })
  @IsOptional()
  role: User_Role_Enum;

  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, {
    message: 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number',
  })
  password: string;

}
