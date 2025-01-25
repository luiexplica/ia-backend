import { auth_Ety } from '@prisma/client';
import { User_I } from '@user/interfaces/user.interface';
import { Auth_I, AuthStatus_Enum, User_Role_Enum } from '@auth/interfaces/auth.interface';

export class Auth implements Auth_I {

  id: string
  email: string;
  password: string;
  username: string;

  created_at?: Date;
  updated_at?: Date;
  last_session: Date;

  status?: AuthStatus_Enum;
  role: User_Role_Enum;
  user?: User_I;
  user_id: string;

  constructor(
    atts: Partial<Auth_I> = {}
  ) {
    this.id = '';
    this.email = '';
    this.password = '';
    this.username = '';
    this.created_at = new Date();
    this.updated_at = new Date();
    this.last_session = new Date();
    this.status = AuthStatus_Enum.ACTIVE;
    this.role = User_Role_Enum.CLIENT_ROLE;
    this.user = null;
    this.user_id = '';
    Object.assign(this, atts);
  }

  static fromOrm(orm: auth_Ety): Auth {
    return new Auth({
      id: orm.id,
      email: orm.email,
      password: orm.password,
      username: orm.username,
      created_at: orm.created_at,
      updated_at: orm.updated_at,
      last_session: orm.last_session,
      status: orm.status as AuthStatus_Enum,
      role: orm.role as User_Role_Enum,
      user_id: orm.user_id,
    });
  }


}

