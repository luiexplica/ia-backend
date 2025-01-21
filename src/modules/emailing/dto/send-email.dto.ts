
import { Type } from "class-transformer";
import { IsString, IsEmail, IsOptional, ValidateNested } from "class-validator";

export class Email_Confirm_Account_Dto {

  @IsString()
  name: string;
  @IsString()
  key: string;

}

export class Email_Reset_Password_Dto {

  @IsString()
  name: string;
  @IsString()
  key: string;

}

export class Email_Change_Email_Dto {

  @IsString()
  name: string;

  @IsString()
  key: string;

  @IsString()
  @IsEmail()
  new_email: string;

}

export class Send_Email_Dto {

  @IsString()
  @IsEmail()
  to: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => Email_Confirm_Account_Dto)
  confirm_account?: Email_Confirm_Account_Dto;

  @IsOptional()
  @ValidateNested()
  @Type(() => Email_Reset_Password_Dto)
  reset_password?: Email_Reset_Password_Dto;

  @IsOptional()
  @ValidateNested()
  @Type(() => Email_Change_Email_Dto)
  change_email?: Email_Change_Email_Dto;

}
