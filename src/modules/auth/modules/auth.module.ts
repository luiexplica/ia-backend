import { Module } from '@nestjs/common';
import { AuthService } from '@auth/services/auth.service';
import { AuthController } from '@auth/auth.controller';
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
    AccountRequestsModule
  ]
})
export class AuthModule { }
