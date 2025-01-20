import { Test, TestingModule } from '@nestjs/testing';
import { EmailingController } from './emailing.controller';
import { EmailingService } from './emailing.service';

describe('EmailingController', () => {
  let controller: EmailingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailingController],
      providers: [EmailingService],
    }).compile();

    controller = module.get<EmailingController>(EmailingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
