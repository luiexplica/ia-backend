import { Controller, Post } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { EmailingService } from './services/emailing.service';
import { Auth } from '@auth/decorators/auth.decorator';
import { Send_Email_Dto } from '@luiexplica/ia-dev-services';

@Controller('emailing')
export class EmailingController {

  constructor(private readonly emailingService: EmailingService) { }

  // @MessagePattern('notifications.emailing.send')
  @Auth()
  @Post('send_email')
  send_email(
    @Payload() send_email_dto: Send_Email_Dto,
  ) {
    return this.emailingService.send_email(send_email_dto);
  }

}
