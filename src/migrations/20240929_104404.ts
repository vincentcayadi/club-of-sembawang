import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DO $$ BEGIN
   CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  ALTER TABLE "posts" ADD COLUMN "status" "enum_posts_status" DEFAULT 'draft';
  ALTER TABLE "posts" ADD COLUMN "published_date" timestamp(3) with time zone;
  ALTER TABLE "posts" ADD COLUMN "author_id" integer;
  DO $$ BEGIN
   ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  `)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "posts" DROP CONSTRAINT "posts_author_id_users_id_fk";
  
  ALTER TABLE "posts" DROP COLUMN IF EXISTS "status";
  ALTER TABLE "posts" DROP COLUMN IF EXISTS "published_date";
  ALTER TABLE "posts" DROP COLUMN IF EXISTS "author_id";`)
}
