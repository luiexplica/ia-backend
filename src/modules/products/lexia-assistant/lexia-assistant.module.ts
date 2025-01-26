import { Module } from '@nestjs/common';
import { LexiaAssistantService } from './lexia-assistant.service';
import { LexiaAssistantController } from './lexia-assistant.controller';

@Module({
  controllers: [LexiaAssistantController],
  providers: [LexiaAssistantService],
})
export class LexiaAssistantModule {}
