import { Gpt_AddMessageConversation_Dto } from './dto/addMessageConversation.dto';
import { Controller, Post, Body, ParseUUIDPipe, Param } from '@nestjs/common';
import { GptService } from './gpt.service';
import { Auth } from '@auth/decorators/auth.decorator';
import { Session_Auth_I } from '@auth/interfaces/auth.interface';
import { User_Auth } from '@auth/decorators/user-auth.decorator';
import { IA_CreateConversation_Dto } from '@products/dto/createConversation.dto';

@Auth()
@Controller('products/gpt')
export class GptController {
  constructor(private readonly gptService: GptService) { }


  @Post('create')
  async create(@Body() createGptDto: IA_CreateConversation_Dto, @User_Auth() User_Auth: Session_Auth_I) {
    return await this.gptService.createConversation(createGptDto, User_Auth);
  }

  @Post('add/:id')
  async addMessage(
    @Body() addDto: Gpt_AddMessageConversation_Dto,
    @User_Auth() User_Auth: Session_Auth_I,
    @Param('id', ParseUUIDPipe) id: string
  ) {
    return await this.gptService.addMessage(id, addDto, User_Auth);
  }




}
