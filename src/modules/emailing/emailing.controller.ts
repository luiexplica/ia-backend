import { Controller } from '@nestjs/common';
import { EmailingService } from './emailing.service';

@Controller('emailing')
export class EmailingController {
  constructor(private readonly emailingService: EmailingService) {}
}
