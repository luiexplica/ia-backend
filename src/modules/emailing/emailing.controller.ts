import { Controller, Post } from '@nestjs/common';
import { EmailingService } from './emailing.service';
import { Payload } from '@nestjs/microservices';
import { Send_Email_Dto } from './dto/send-email.dto';

@Controller('emailing')
export class EmailingController {

  constructor(private readonly emailingService: EmailingService) { }


  // @MessagePattern('notifications.emailing.send')
  @Post('send_email')
  send_email(
    @Payload() send_email_dto: Send_Email_Dto,
  ) {
    return this.emailingService.send_email(send_email_dto);
  }


}
