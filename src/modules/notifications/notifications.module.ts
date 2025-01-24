import { Module } from '@nestjs/common';
import { NOTIFICATIONS_SERVICE_TOKEN, NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { EmailingModule } from '@emailing/emailing.module';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [
    NotificationsController
  ],
  providers: [
    {
      provide: NOTIFICATIONS_SERVICE_TOKEN,
      useClass: NotificationsService
    }
  ],
  imports: [
    EmailingModule,
    UserModule
  ],
  exports: [
    NOTIFICATIONS_SERVICE_TOKEN
  ]
})
export class NotificationsModule { }
