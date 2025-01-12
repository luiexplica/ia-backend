import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User_Ety } from './entities/user.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User_ormRepository } from './entities/user.repository.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [
    UserController
  ],
  providers: [
    UserService,
    User_ormRepository
  ],
  imports: [
    MikroOrmModule.forFeature([
      User_Ety
    ]),
  ]
})
export class UserModule { }
