import { Controller, Post, Body } from '@nestjs/common';
import { GptService } from './gpt.service';
import { Auth } from '@auth/decorators/auth.decorator';
import { Session_Auth_I } from '@auth/interfaces/auth.interface';
import { User_Auth } from '@auth/decorators/user-auth.decorator';

@Auth()
@Controller('products/gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}


  @Post()
  create(@Body() createGptDto: any, @User_Auth() User_Auth: Session_Auth_I) {
    return this.gptService.createConversation(createGptDto);
  }


}
