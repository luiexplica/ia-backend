import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { envs } from "@core/config/envs";
import { JwtStrategy } from "@auth/strategies/jwt.strategy";
import { Module } from "@nestjs/common";
import { AuthConfigService } from "@auth/services/authConfig.service";

const _PassportModule = PassportModule.register({
  defaultStrategy: 'jwt',
});

const _JwtModule = JwtModule.registerAsync({
  useFactory() {
    return {
      secret: envs.jwtSecret,
      signOptions: {
        expiresIn: '48H',
      },
    };
  },
});

@Module({
  controllers: [
  ],
  providers: [
    JwtStrategy,
    AuthConfigService,
  ],
  exports: [
    JwtStrategy,
    PassportModule,
    AuthConfigService
  ],
  imports: [
    _PassportModule,
    _JwtModule
  ]
})
export class AuthConfigModule { }
