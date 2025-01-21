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


/*

{
	"to": "alvarosego01@gmail.com",
	"confirm_account": {
		"name": "Álvaro",
		"key": "123456"
	}
}

  {
	"to": "alvarosego01@gmail.com",
	"reset_password": {
		"name": "Álvaro",
		"key": "123456"
	}
}

  {
	"to": "alvarosego01@gmail.com",
	"change_email": {
		"name": "Álvaro",
		"key": "123456",
    "new_email": "alvaro_segovia01@hotmail.com"
	}
}



 */