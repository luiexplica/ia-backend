import { Test, TestingModule } from '@nestjs/testing';
import { LexiaAssistantService } from './lexia-assistant.service';

describe('LexiaAssistantService', () => {
  let service: LexiaAssistantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LexiaAssistantService],
    }).compile();

    service = module.get<LexiaAssistantService>(LexiaAssistantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
