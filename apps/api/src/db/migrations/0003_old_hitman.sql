ALTER TABLE "subjects" RENAME TO "categories";--> statement-breakpoint
ALTER TABLE "decks" RENAME COLUMN "subject_id" TO "category_id";--> statement-breakpoint
ALTER TABLE "categories" DROP CONSTRAINT "subjects_title_unique";--> statement-breakpoint
ALTER TABLE "decks" DROP CONSTRAINT "decks_subject_id_subjects_id_fk";
--> statement-breakpoint
ALTER TABLE "decks" ADD CONSTRAINT "decks_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_title_unique" UNIQUE("title");