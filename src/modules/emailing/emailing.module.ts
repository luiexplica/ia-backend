import { Global, Module } from '@nestjs/common';
import { EmailingService } from './emailing.service';
import { EmailingController } from './emailing.controller';

// @Global()
@Module({
  controllers: [
    // EmailingController
  ],
  providers: [
    EmailingService
  ],
  exports: [
    EmailingService
  ]
})
export class EmailingModule {}
