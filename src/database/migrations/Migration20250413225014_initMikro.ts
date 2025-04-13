import { Migration } from '@mikro-orm/migrations';

export class Migration20250413225014_initMikro extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "user" ("id" uuid not null default gen_random_uuid(), "name" varchar(255) not null, "last_name" varchar(255) not null, "gender" text check ("gender" in ('MALE', 'FEMALE', 'NONE')) not null default 'NONE', "created_at" timestamptz not null, constraint "user_pkey" primary key ("id"));`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "user" cascade;`);
  }

}
