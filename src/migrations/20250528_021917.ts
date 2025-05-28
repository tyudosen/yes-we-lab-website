import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_orders_status" AS ENUM('PENDING', 'PROCESSING', 'COMPLETE');
  ALTER TABLE "media" ADD COLUMN "owned_by_id" integer;
  ALTER TABLE "orders" ADD COLUMN "status" "enum_orders_status";
  DO $$ BEGIN
   ALTER TABLE "media" ADD CONSTRAINT "media_owned_by_id_users_id_fk" FOREIGN KEY ("owned_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "media_owned_by_idx" ON "media" USING btree ("owned_by_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media" DROP CONSTRAINT "media_owned_by_id_users_id_fk";
  
  DROP INDEX IF EXISTS "media_owned_by_idx";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "owned_by_id";
  ALTER TABLE "orders" DROP COLUMN IF EXISTS "status";
  DROP TYPE "public"."enum_orders_status";`)
}
