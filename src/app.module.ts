import { Module } from '@nestjs/common';
import { AuthModule } from '@auth/modules/auth.module';
import { UserModule } from '@user/user.module';
import { PrismaModule } from '@db/prisma/prisma.module';
import { AccountRequestsModule } from '@ac-requests/account-requests.module';
import { CoreModule } from '@core/core.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { EmailingModule } from './modules/emailing/emailing.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { GptModule } from './modules/products/gpt/gpt.module';
import { LexiaAssistantModule } from './modules/products/lexia-assistant/lexia-assistant.module';
import { ProductsModule } from './modules/products/products.module';
 @Module({
  imports: [
    EventEmitterModule.forRoot(),
    CoreModule,
    PrismaModule,
    AuthModule,
    AccountRequestsModule,
    UserModule,
    NotificationsModule,
    EmailingModule,
    ProductsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
