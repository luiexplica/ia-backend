
import { Module } from '@nestjs/common';
import { EmailingService } from './services/emailing.service';
import { EmailingEventHandlerService } from './services/emailing-eventHandler.service';

// @Global()
@Module({
  controllers: [
    // EmailingController
  ],
  providers: [
    EmailingEventHandlerService,
    EmailingService,
  ],
  exports: [
    EmailingService
  ]
})
export class EmailingModule {}
