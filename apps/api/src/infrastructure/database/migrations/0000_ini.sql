CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"username" varchar(50) NOT NULL,
	"display_name" varchar(100),
	"bio" varchar(255),
	"currency_type" varchar(10) DEFAULT 'USD' NOT NULL,
	"profile_picture_url" varchar,
	"country" varchar(50),
	"state" varchar(50),
	"city" varchar(50),
	"zip_code" varchar(20),
	"street_address" varchar(100),
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
