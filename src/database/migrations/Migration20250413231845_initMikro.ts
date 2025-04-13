import { Migration } from '@mikro-orm/migrations';

export class Migration20250413231845_initMikro extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "profile" ("id" uuid not null default gen_random_uuid(), "data" text not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "user_id" uuid null, constraint "profile_pkey" primary key ("id"));`);
    this.addSql(`alter table "profile" add constraint "profile_user_id_unique" unique ("user_id");`);

    this.addSql(`alter table "profile" add constraint "profile_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;`);

    this.addSql(`alter table "user" add column "updated_at" timestamptz not null;`);
    this.addSql(`alter table "user" alter column "name" type text using ("name"::text);`);
    this.addSql(`alter table "user" alter column "last_name" type text using ("last_name"::text);`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "profile" cascade;`);

    this.addSql(`alter table "user" drop column "updated_at";`);

    this.addSql(`alter table "user" alter column "name" type varchar(255) using ("name"::varchar(255));`);
    this.addSql(`alter table "user" alter column "last_name" type varchar(255) using ("last_name"::varchar(255));`);
  }

}
