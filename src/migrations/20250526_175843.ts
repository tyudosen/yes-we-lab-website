import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
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
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_password" ADD CONSTRAINT "forms_blocks_password_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "forms_blocks_password_order_idx" ON "forms_blocks_password" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_password_parent_id_idx" ON "forms_blocks_password" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_password_path_idx" ON "forms_blocks_password" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "forms_blocks_password" CASCADE;`)
}
