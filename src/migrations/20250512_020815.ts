import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_pages_hero_type" ADD VALUE 'dashboard';
  ALTER TYPE "public"."enum__pages_v_version_hero_type" ADD VALUE 'dashboard';
  CREATE TABLE IF NOT EXISTS "pages_blocks_recent_scans_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_quick_actions_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_recent_scans_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_quick_actions_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  DROP TABLE "forms_blocks_password" CASCADE;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_recent_scans_block" ADD CONSTRAINT "pages_blocks_recent_scans_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_quick_actions_block" ADD CONSTRAINT "pages_blocks_quick_actions_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_recent_scans_block" ADD CONSTRAINT "_pages_v_blocks_recent_scans_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_quick_actions_block" ADD CONSTRAINT "_pages_v_blocks_quick_actions_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_recent_scans_block_order_idx" ON "pages_blocks_recent_scans_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_recent_scans_block_parent_id_idx" ON "pages_blocks_recent_scans_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_recent_scans_block_path_idx" ON "pages_blocks_recent_scans_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_quick_actions_block_order_idx" ON "pages_blocks_quick_actions_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_quick_actions_block_parent_id_idx" ON "pages_blocks_quick_actions_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_quick_actions_block_path_idx" ON "pages_blocks_quick_actions_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_recent_scans_block_order_idx" ON "_pages_v_blocks_recent_scans_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_recent_scans_block_parent_id_idx" ON "_pages_v_blocks_recent_scans_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_recent_scans_block_path_idx" ON "_pages_v_blocks_recent_scans_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_quick_actions_block_order_idx" ON "_pages_v_blocks_quick_actions_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_quick_actions_block_parent_id_idx" ON "_pages_v_blocks_quick_actions_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_quick_actions_block_path_idx" ON "_pages_v_blocks_quick_actions_block" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "forms_blocks_password" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  DROP TABLE "pages_blocks_recent_scans_block" CASCADE;
  DROP TABLE "pages_blocks_quick_actions_block" CASCADE;
  DROP TABLE "_pages_v_blocks_recent_scans_block" CASCADE;
  DROP TABLE "_pages_v_blocks_quick_actions_block" CASCADE;
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_password" ADD CONSTRAINT "forms_blocks_password_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "forms_blocks_password_order_idx" ON "forms_blocks_password" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_password_parent_id_idx" ON "forms_blocks_password" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_password_path_idx" ON "forms_blocks_password" USING btree ("_path");
  ALTER TABLE "public"."pages" ALTER COLUMN "hero_type" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_hero_type";
  CREATE TYPE "public"."enum_pages_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact', 'noImpact', 'highImpactV2');
  ALTER TABLE "public"."pages" ALTER COLUMN "hero_type" SET DATA TYPE "public"."enum_pages_hero_type" USING "hero_type"::"public"."enum_pages_hero_type";
  ALTER TABLE "public"."_pages_v" ALTER COLUMN "version_hero_type" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_version_hero_type";
  CREATE TYPE "public"."enum__pages_v_version_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact', 'noImpact', 'highImpactV2');
  ALTER TABLE "public"."_pages_v" ALTER COLUMN "version_hero_type" SET DATA TYPE "public"."enum__pages_v_version_hero_type" USING "version_hero_type"::"public"."enum__pages_v_version_hero_type";`)
}
