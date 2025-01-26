import { PartialType } from '@nestjs/mapped-types';
import { CreateLexiaAssistantDto } from './create-lexia-assistant.dto';

export class UpdateLexiaAssistantDto extends PartialType(CreateLexiaAssistantDto) {}
