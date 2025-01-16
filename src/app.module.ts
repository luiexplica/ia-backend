import { Module } from '@nestjs/common';
import { AuthModule } from '@auth/auth.module';
import { UserModule } from '@user/user.module';
import { PrismaModule } from '@db/prisma/prisma.module';
import { AccountRequestsModule } from '@ac-requests/account-requests.module';
import { CoreModule } from '@core/core.module';
 @Module({
  imports: [
    CoreModule,
    PrismaModule,
    AuthModule,
    AccountRequestsModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
