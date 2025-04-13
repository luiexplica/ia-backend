
import { MikroOrmModule } from "@mikro-orm/nestjs";
import config from '../mikro-orm.config';
import { Global, Module } from "@nestjs/common";
import { User_Ety } from "../modules/mikro/entities/users.entity";
import { Profile_Ety } from "../modules/mikro/entities/profile.entity";

// export const MIKRO_ORM_MODULE = MikroOrmModule.forRoot(config);


@Global()
@Module({
  imports: [
    // MikroModule
    MikroOrmModule.forRoot(config),
    MikroOrmModule.forFeature([
      User_Ety,
      Profile_Ety
    ]),
  ],
  controllers: [],
  providers: [],
  exports: [
    MikroOrmModule
  ]
})
export class MIKRO_ORM_MODULE { }
