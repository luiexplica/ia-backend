import { IsEnum, IsOptional, IsString, IsUUID, ValidateIf } from "class-validator";
import { RequestType_Enum } from "@ac-requests/interfaces/accountRequests.inteface";

export class Create_Request_Key_Dto {

    @IsEnum(RequestType_Enum, {
        message: `type must be one of the following values: ${{ ...RequestType_Enum }}`
    })
    type: RequestType_Enum;

    @IsOptional()
    @IsString()
    detail: string;

}