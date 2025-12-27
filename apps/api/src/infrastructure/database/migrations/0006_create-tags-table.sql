CREATE TABLE "tags" (
	"name" varchar(100) PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	"humanized_name" varchar(191),
	CONSTRAINT "tags_name_unique" UNIQUE("name")
);
