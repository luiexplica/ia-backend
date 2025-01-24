import { Module } from '@nestjs/common';
import { EMAILING_SERVICE_TOKEN, EmailingService } from './emailing.service';

// @Global()
@Module({
  controllers: [
    // EmailingController
  ],
  providers: [
    {
      provide: EMAILING_SERVICE_TOKEN,
      useClass: EmailingService
    }
  ],
  exports: [
    EMAILING_SERVICE_TOKEN
  ]
})
export class EmailingModule {}
