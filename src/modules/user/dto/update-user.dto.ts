
import { IsEnum, IsOptional, IsPhoneNumber, IsString, ValidateIf } from 'class-validator';
import { Gender_Enum } from '@user/interfaces/user.interface';

export class UpdateUser_Dto {

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  last_name?: string;


  @IsEnum(Gender_Enum, {
    message: `Gender must be one of the following values: ${{ ...Gender_Enum }}`
  })
  @IsOptional()
  gender?: Gender_Enum;

  @ValidateIf(o => o.phone !== '' && o.phone !== null && o.phone !== undefined)
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

}
