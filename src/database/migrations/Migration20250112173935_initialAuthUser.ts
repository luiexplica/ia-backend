import { Migration } from '@mikro-orm/migrations';

export class Migration20250112173935_initialAuthUser extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "user" ("_id" uuid not null default gen_random_uuid(), "name" varchar(255) not null, "last_name" varchar(255) not null, "gender" text check ("gender" in ('MALE', 'FEMALE', 'NONE')) not null default 'NONE', "phone" varchar(255) null, "updated_at" timestamptz not null default '2025-01-12 13:39:34', constraint "user_pkey" primary key ("_id"));`);

    this.addSql(`create table "auth" ("_id" uuid not null default gen_random_uuid(), "email" varchar(255) not null, "password" varchar(255) not null, "username" varchar(255) null, "created_at" timestamptz not null default '2025-01-12 13:39:34', "updated_at" timestamptz not null default '2025-01-12 13:39:34', "last_session" timestamptz null, "status" text check ("status" in ('VERIFIED', 'BLOCKED', 'DELETED', 'SUSPENDED', 'PENDING', 'ACTIVE', 'INACTIVE')) not null default 'PENDING', "role" text check ("role" in ('ADMIN_ROLE', 'SUPPORT_ROLE', 'CLIENT_ROLE')) not null default 'CLIENT_ROLE', "user__id" uuid not null, constraint "auth_pkey" primary key ("_id"));`);
    this.addSql(`alter table "auth" add constraint "auth_email_unique" unique ("email");`);
    this.addSql(`alter table "auth" add constraint "auth_username_unique" unique ("username");`);
    this.addSql(`alter table "auth" add constraint "auth_user__id_unique" unique ("user__id");`);

    this.addSql(`alter table "auth" add constraint "auth_user__id_foreign" foreign key ("user__id") references "user" ("_id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "auth" drop constraint "auth_user__id_foreign";`);

    this.addSql(`drop table if exists "user" cascade;`);

    this.addSql(`drop table if exists "auth" cascade;`);
  }

}
