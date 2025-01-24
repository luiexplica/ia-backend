import { Module } from '@nestjs/common';
import { NOTIFICATIONS_SERVICE_TOKEN, NotificationsService } from './services/notifications.service';
import { NotificationsController } from './notifications.controller';
import { EmailingModule } from '@emailing/emailing.module';
import { UserModule } from '@user/user.module';
import { NotificationsEventHandlerService } from './services/notifications-eventHandler.service';

@Module({
  controllers: [
    NotificationsController
  ],
  providers: [
    NotificationsEventHandlerService,
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
