CREATE TABLE "seller_profiles" (
	"seller_id" integer PRIMARY KEY NOT NULL,
	"highlight_color" varchar,
	"background_color" varchar,
	"font" varchar,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
ALTER TABLE "seller_profiles" ADD CONSTRAINT "seller_profiles_seller_id_users_id_fk" FOREIGN KEY ("seller_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;