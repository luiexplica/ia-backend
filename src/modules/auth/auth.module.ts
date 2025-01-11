import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Auth_ormRepository } from './entities/auth.repository.service';
import { Auth_Ety } from './entities/auth.entity';
import { envs } from '@core/config/envs';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    Auth_ormRepository
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

    MikroOrmModule.forFeature([
        Auth_Ety
    ]),
  ]
})
export class AuthModule { }
