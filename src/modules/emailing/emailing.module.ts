
import { Module } from '@nestjs/common';
import { EmailingService } from './services/emailing.service';
import { EmailingEventsService } from './services/emailing-events.service';

// @Global()
@Module({
  controllers: [
    // EmailingController
  ],
  providers: [
    EmailingEventsService,
    EmailingService,
  ],
  exports: [
    EmailingService
  ]
})
export class EmailingModule {}
