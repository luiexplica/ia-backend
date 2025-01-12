
import { Cascade, Entity, EntityRepositoryType, Enum, OneToOne, Property, Rel } from "@mikro-orm/core";
import { Schema_key } from "@core/entities_global";

import { TempoHandler } from "@core/helpers/TempoHandler";
import { Gender_Enum } from "@user/interfaces/user.interface";
import { Auth_Ety } from "@auth/entities/auth.entity";
import { User_ormRepository } from "./user.repository.service";

@Entity({
  tableName: 'user',
  collection: 'user',
  repository: () => User_ormRepository
})
export class User_Ety extends Schema_key {

  [EntityRepositoryType]?: User_ormRepository;

  @Property({
    type: 'varchar'
  })
  name: string;

  @Property({
    type: 'varchar'
  })
  last_name: string;

  @Enum({ items: () => Gender_Enum, default: Gender_Enum.NONE })
  @Property({
    nullable: true
  })
  gender?: Gender_Enum;

  @Property({
    type: 'varchar',
    nullable: true
  })
  phone?: string;

  @Property({
    type: 'timestamp',
    onUpdate: () => new TempoHandler().date_now()
  })
  updated_at = new TempoHandler().date_now()

  @OneToOne(() => Auth_Ety, auth => auth.user)
  auth: Rel<Auth_Ety>;

}

