import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "orders_items" ADD COLUMN "notes" jsonb;
  ALTER TABLE "orders" ADD COLUMN "placed_by_id" integer;
  DO $$ BEGIN
   ALTER TABLE "orders" ADD CONSTRAINT "orders_placed_by_id_users_id_fk" FOREIGN KEY ("placed_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "orders_placed_by_idx" ON "orders" USING btree ("placed_by_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "orders" DROP CONSTRAINT "orders_placed_by_id_users_id_fk";
  
  DROP INDEX IF EXISTS "orders_placed_by_idx";
  ALTER TABLE "orders_items" DROP COLUMN IF EXISTS "notes";
  ALTER TABLE "orders" DROP COLUMN IF EXISTS "placed_by_id";`)
}
