import { Test, TestingModule } from '@nestjs/testing';
import { LexiaAssistantController } from './lexia-assistant.controller';
import { LexiaAssistantService } from './lexia-assistant.service';

describe('LexiaAssistantController', () => {
  let controller: LexiaAssistantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LexiaAssistantController],
      providers: [LexiaAssistantService],
    }).compile();

    controller = module.get<LexiaAssistantController>(LexiaAssistantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
