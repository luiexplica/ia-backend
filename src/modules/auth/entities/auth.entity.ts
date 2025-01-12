import { Entity, Property, Enum, OneToMany, EntityRepositoryType, OneToOne, Rel, Cascade } from "@mikro-orm/core";
import { Schema_key } from "@core/entities_global";
import { TempoHandler } from "@core/helpers/TempoHandler";
import { AuthStatus_Enum, User_Role_Enum } from "../interfaces/auth.interface";
import { Auth_ormRepository } from "./auth.repository.service";
import { User_Ety } from "@user/entities/user.entity";

@Entity({
  tableName: 'auth',
  collection: 'auth',
  repository: () => Auth_ormRepository
})
export class Auth_Ety extends Schema_key {

  [EntityRepositoryType]?: Auth_ormRepository

  @Property({
    type: 'varchar',
    unique: true
  })
  email: string;

  @Property({
    type: 'varchar'
  })
  password: string;

  @Property({
    type: 'varchar',
    unique: true,
    nullable: true
  })
  username?: string;

  @Property({
    type: 'timestamp',
    onCreate: () => new TempoHandler().date_now()
  })
  created_at = new TempoHandler().date_now();

  @Property({
    type: 'timestamp',
    onUpdate: () => new TempoHandler().date_now()
  })
  updated_at = new TempoHandler().date_now();

  @Property({
    type: 'timestamp',
    nullable: true
  })
  last_session: string;

  @Enum({ items: () => AuthStatus_Enum, default: AuthStatus_Enum.PENDING })
  @Property()
  status: AuthStatus_Enum;

  @Enum({ items: () => User_Role_Enum, default: User_Role_Enum.CLIENT_ROLE })
  @Property()
  role: User_Role_Enum = User_Role_Enum.CLIENT_ROLE;

  @OneToOne(() => User_Ety, user => user.auth, { owner: true, orphanRemoval: true, cascade: [Cascade.PERSIST] })
  user: Rel<User_Ety>;

}


