import { User_I, TempoHandler, SchemaKey_I } from "@luiexplica/ia-dev-services";

import { Entity, Property, Enum, OneToOne, Rel, PrimaryKey, Cascade } from "@mikro-orm/core";
import { Gender_Enum } from "@prisma/client";
import { User_Ety } from "./users.entity";

@Entity({
  tableName: 'profile',
  collection: 'profile',
  // repository: () => User_Repository
})
export class Profile_Ety {

  // [EntityRepositoryType]?: User_Repository;

  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id: string

  @Property({
    type: 'text'
  })
  data: string;

  @Property({
    type: 'timestamp',
    onCreate: () => new TempoHandler().date_now()
  })
  created_at = new TempoHandler().date_now()

  @Property({
    type: 'timestamp',
    onUpdate: () => new TempoHandler().date_now()
  })
  updated_at = new TempoHandler().date_now();

  @OneToOne(() => User_Ety, { cascade: [Cascade.ALL] })
  user: Rel<User_Ety>;

}

