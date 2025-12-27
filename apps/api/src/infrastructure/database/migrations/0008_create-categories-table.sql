CREATE TABLE "categories" (
	"slug" varchar(100) PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "categories_slug_unique" UNIQUE("slug")
);
