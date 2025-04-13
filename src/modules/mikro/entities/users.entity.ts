import { User_I, TempoHandler, SchemaKey_I } from "@luiexplica/ia-dev-services";

import { Entity, Property, Enum, OneToOne, Rel, PrimaryKey } from "@mikro-orm/core";
import { Gender_Enum } from "@prisma/client";
import { Profile_Ety } from "./profile.entity";

@Entity({
  tableName: 'user',
  collection: 'user',
  // repository: () => User_Repository
})
export class User_Ety {

  // [EntityRepositoryType]?: User_Repository;

  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id: string

  @Property({
    type: 'text'
  })
  name: string;

  @Property({
    type: 'text'
  })
  last_name: string;

  @Enum({ items: () => Gender_Enum })
  @Property({
    nullable: true
  })
  gender?: string = "NONE";

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

  @OneToOne(() => Profile_Ety, profile => profile.user, { mappedBy: 'user', orphanRemoval: true })
  profile: Rel<Profile_Ety>;

}

