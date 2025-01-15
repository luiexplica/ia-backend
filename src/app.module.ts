import { Module } from '@nestjs/common';
import { MIKRO_ORM_MODULE_CONFIG } from './database/mikro-orm.module';
import { AuthModule } from '@auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './database/prisma/prisma.module';
import { AccountRequestsModule } from './modules/account-requests/account-requests.module';
 @Module({
  imports: [
    MIKRO_ORM_MODULE_CONFIG,
    PrismaModule,
    AuthModule,
    UserModule,
    AccountRequestsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
