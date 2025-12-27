CREATE TABLE "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"purchaser_id" integer NOT NULL,
	"seller_id" integer NOT NULL,
	"total_paid" integer NOT NULL,
	"currency" varchar(10) NOT NULL,
	"payment_status" varchar(50) DEFAULT 'paid' NOT NULL,
	"created_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_purchaser_id_users_id_fk" FOREIGN KEY ("purchaser_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_seller_id_users_id_fk" FOREIGN KEY ("seller_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;