CREATE TABLE "seller_profile_sections" (
	"seller_id" integer PRIMARY KEY NOT NULL,
	"header" varchar NOT NULL,
	"product_id" integer,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
ALTER TABLE "seller_profile_sections" ADD CONSTRAINT "seller_profile_sections_seller_id_users_id_fk" FOREIGN KEY ("seller_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "seller_profile_sections" ADD CONSTRAINT "seller_profile_sections_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;