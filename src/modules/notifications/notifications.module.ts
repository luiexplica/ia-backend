import { Module } from '@nestjs/common';
import { NotificationsService } from './services/notifications.service';
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
    NotificationsService
  ],
  imports: [
    EmailingModule,
    UserModule
  ],
  exports: [
    NotificationsService
  ]
})
export class NotificationsModule { }
