import { Injectable } from '@nestjs/common';
import { CreateLexiaAssistantDto } from './dto/create-lexia-assistant.dto';
import { UpdateLexiaAssistantDto } from './dto/update-lexia-assistant.dto';

@Injectable()
export class LexiaAssistantService {
  create(createLexiaAssistantDto: CreateLexiaAssistantDto) {
    return 'This action adds a new lexiaAssistant';
  }


}
