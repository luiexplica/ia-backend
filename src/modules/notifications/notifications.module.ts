import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { EmailingModule } from '@emailing/emailing.module';

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService],
  imports: [
    EmailingModule
  ]
})
export class NotificationsModule {}
