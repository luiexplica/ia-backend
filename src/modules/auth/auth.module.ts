import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { envs } from '@core/config/envs';
import { JwtStrategy } from './strategies/jwt.strategy';
import { NotificationsModule } from '@notifications/notifications.module';
import { EmailingModule } from '@emailing/emailing.module';
import { AccountRequestsModule } from '../account-requests/modules/account-requests.module';

@Module({
  controllers: [
    AuthController
  ],
  providers: [
    JwtStrategy,
    AuthService
  ],
  exports: [
    JwtStrategy,
    PassportModule,
    AuthService
  ],
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      useFactory() {
        return {
          secret: envs.jwtSecret,
          signOptions: {
            expiresIn: '48H',
          },
        };
      },
    }),

    AccountRequestsModule,
    NotificationsModule,
    EmailingModule
  ]
})
export class AuthModule { }
