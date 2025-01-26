import { Module } from '@nestjs/common';
import { AuthModule } from '@auth/modules/auth.module';
import { UserModule } from '@user/user.module';
import { PrismaModule } from '@db/prisma/prisma.module';
import { AccountRequestsModule } from '@ac-requests/account-requests.module';
import { CoreModule } from '@core/core.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { EmailingModule } from './modules/emailing/emailing.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
 @Module({
  imports: [
    EventEmitterModule.forRoot(),
    CoreModule,
    PrismaModule,
    AuthModule,
    AccountRequestsModule,
    UserModule,
    NotificationsModule,
    EmailingModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
