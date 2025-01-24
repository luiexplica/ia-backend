
import { IsEnum, IsOptional, IsString, IsUUID, MinLength } from "class-validator";
import { NotificationTemplate_Enum } from "@notifications/interfaces/notifications.interfaces";

export class Create_Notification_Dto {

  @IsString()
  @MinLength(3)
  @IsOptional()
  subject?: string;

  @IsString()
  @MinLength(10)
  @IsOptional()
  message?: string;

  @IsEnum(NotificationTemplate_Enum, {
    message: `Template must be one of the following values: ${{ ...NotificationTemplate_Enum }}`
  })
  template: NotificationTemplate_Enum = NotificationTemplate_Enum.INFO;

  @IsUUID(4, { message: 'user is a Invalid UUID' })
  user: string;

}

/*
{
"subject": "El asunto",
"message": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
"user": ""
}
 */
