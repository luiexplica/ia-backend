import { Module } from '@nestjs/common';
import { MIKRO_ORM_MODULE_CONFIG } from './database/mikro-orm.module';
import { AuthModule } from '@auth/auth.module';
import { UserModule } from './modules/user/user.module';
 @Module({
  imports: [
    MIKRO_ORM_MODULE_CONFIG,
    AuthModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
