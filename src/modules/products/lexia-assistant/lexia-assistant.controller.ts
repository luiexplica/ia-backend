import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LexiaAssistantService } from './lexia-assistant.service';
import { CreateLexiaAssistantDto } from './dto/create-lexia-assistant.dto';
import { UpdateLexiaAssistantDto } from './dto/update-lexia-assistant.dto';

@Controller('products/lexia-assistant')
export class LexiaAssistantController {
  constructor(private readonly lexiaAssistantService: LexiaAssistantService) {}

  @Post()
  create(@Body() createLexiaAssistantDto: CreateLexiaAssistantDto) {
    return this.lexiaAssistantService.create(createLexiaAssistantDto);
  }

}
