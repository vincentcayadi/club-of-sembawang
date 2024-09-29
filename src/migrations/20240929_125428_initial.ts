import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE TABLE IF NOT EXISTS "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_banner_image_id" integer,
  	"version_cock" varchar,
  	"version_published_date" timestamp(3) with time zone,
  	"version_author_id" integer,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  ALTER TABLE "pages" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "pages" ALTER COLUMN "content" SET NOT NULL;
  ALTER TABLE "pages" ADD COLUMN "page_meta_title" varchar NOT NULL;
  ALTER TABLE "pages" ADD COLUMN "page_meta_description" varchar NOT NULL;
  ALTER TABLE "pages" ADD COLUMN "page_meta_keywords" varchar;
  ALTER TABLE "pages" ADD COLUMN "status" "enum_pages_status" DEFAULT 'draft';
  ALTER TABLE "posts" ADD COLUMN "name" varchar;
  ALTER TABLE "posts" ADD COLUMN "banner_image_id" integer;
  ALTER TABLE "posts" ADD COLUMN "cock" varchar;
  ALTER TABLE "posts" ADD COLUMN "slug" varchar;
  ALTER TABLE "posts" ADD COLUMN "_status" "enum_posts_status" DEFAULT 'draft';
  DO $$ BEGIN
   ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_banner_image_id_media_id_fk" FOREIGN KEY ("version_banner_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_author_id_users_id_fk" FOREIGN KEY ("version_author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  DO $$ BEGIN
   ALTER TABLE "posts" ADD CONSTRAINT "posts_banner_image_id_media_id_fk" FOREIGN KEY ("banner_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "posts__status_idx" ON "posts" USING btree ("_status");
  ALTER TABLE "posts" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "posts" DROP COLUMN IF EXISTS "content";
  ALTER TABLE "posts" DROP COLUMN IF EXISTS "status";`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "_posts_v";
  ALTER TABLE "posts" DROP CONSTRAINT "posts_banner_image_id_media_id_fk";
  
  DROP INDEX IF EXISTS "posts__status_idx";
  ALTER TABLE "pages" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "pages" ALTER COLUMN "content" DROP NOT NULL;
  ALTER TABLE "posts" ADD COLUMN "title" varchar;
  ALTER TABLE "posts" ADD COLUMN "content" jsonb;
  ALTER TABLE "posts" ADD COLUMN "status" "enum_posts_status" DEFAULT 'draft';
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "page_meta_title";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "page_meta_description";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "page_meta_keywords";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "status";
  ALTER TABLE "posts" DROP COLUMN IF EXISTS "name";
  ALTER TABLE "posts" DROP COLUMN IF EXISTS "banner_image_id";
  ALTER TABLE "posts" DROP COLUMN IF EXISTS "cock";
  ALTER TABLE "posts" DROP COLUMN IF EXISTS "slug";
  ALTER TABLE "posts" DROP COLUMN IF EXISTS "_status";`)
}
