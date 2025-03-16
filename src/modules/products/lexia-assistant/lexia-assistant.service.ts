import { CreateLexiaAssistantDto } from '@luiexplica/ia-dev-services';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LexiaAssistantService {
  create(createLexiaAssistantDto: CreateLexiaAssistantDto) {
    return 'This action adds a new lexiaAssistant';
  }


}
