import { Controller, Post, Body } from '@nestjs/common';
import { LexiaAssistantService } from './lexia-assistant.service';
import { CreateLexiaAssistantDto } from '@luiexplica/ia-dev-services';

@Controller('products/lexia-assistant')
export class LexiaAssistantController {
  constructor(private readonly lexiaAssistantService: LexiaAssistantService) {}

  @Post()
  create(@Body() createLexiaAssistantDto: CreateLexiaAssistantDto) {
    return this.lexiaAssistantService.create(createLexiaAssistantDto);
  }

}
