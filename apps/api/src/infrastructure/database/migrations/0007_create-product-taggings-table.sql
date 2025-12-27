CREATE TABLE "product_taggings" (
	"tag_id" serial NOT NULL,
	"product_id" integer NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
ALTER TABLE "product_taggings" ADD CONSTRAINT "product_taggings_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;