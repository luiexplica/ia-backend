import { Module } from '@nestjs/common';
import { USER_SERVICE_TOKEN, UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [
    UserController
  ],
  providers: [
    {
      provide: USER_SERVICE_TOKEN,
      useClass: UserService,
    },
  ],
  exports: [
    USER_SERVICE_TOKEN
  ]
})
export class UserModule { }
