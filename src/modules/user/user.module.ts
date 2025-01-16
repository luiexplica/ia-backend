import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [
    UserController
  ],
  providers: [
    UserService,
  ],
  imports: [
  ]
})
export class UserModule { }
