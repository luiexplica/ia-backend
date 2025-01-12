import { Migration } from '@mikro-orm/migrations';

export class Migration20250112000412_initialAuth extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "auth" ("_id" uuid not null default gen_random_uuid(), "email" varchar(255) not null, "password" varchar(255) not null, "username" varchar(255) null, "created_at" timestamptz not null default '2025-01-11 20:04:12', "updated_at" timestamptz not null default '2025-01-11 20:04:12', "last_session" timestamptz null, "status" text check ("status" in ('VERIFIED', 'BLOCKED', 'DELETED', 'SUSPENDED', 'PENDING', 'ACTIVE', 'INACTIVE')) not null default 'PENDING', "role" text check ("role" in ('ADMIN_ROLE', 'SUPPORT_ROLE', 'CLIENT_ROLE')) not null default 'CLIENT_ROLE', constraint "auth_pkey" primary key ("_id"));`);
    this.addSql(`alter table "auth" add constraint "auth_email_unique" unique ("email");`);
    this.addSql(`alter table "auth" add constraint "auth_username_unique" unique ("username");`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "auth" cascade;`);
  }

}
