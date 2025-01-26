import { Module } from '@nestjs/common';
import { AuthService } from '@auth/services/auth.service';
import { AuthController } from '@auth/auth.controller';
import { EmailingModule } from '@emailing/emailing.module';
import { AccountRequestsModule } from '@ac-requests/account-requests.module';
import { AuthConfigModule } from './authConfig.module';

@Module({
  controllers: [
    AuthController
  ],
  providers: [
    AuthService
  ],
  exports: [
    AuthService
  ],
  imports: [
    AuthConfigModule,
    AccountRequestsModule,
    EmailingModule,

  ]
})
export class AuthModule { }
