import {
  pgTable,
  serial,
  timestamp,
  integer,
  pgEnum,
  varchar,
  text,
  boolean,
} from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["user", "admin", "moderator"]);
export const difficultyEnum = pgEnum("difficulty", [
  "beginner",
  "intermediate",
  "advanced",
]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 50 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  role: userRoleEnum("role").default("user").notNull(),
  // xpPoints: integer("xp_points").default(0).notNull(),
  // level: integer("level").default(1).notNull(),
  // streakDays: integer("level").default(1).notNull(),
  avatarUrl: varchar("avatar_url", { length: 255 }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 100 }).notNull().unique(),
  description: text("description"),
  iconUrl: varchar("icon_url", { length: 255 }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const decks = pgTable("decks", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id")
    .notNull()
    .references(() => categories.id),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  title: varchar("title", { length: 150 }).notNull(),
  description: text("description"),
  difficulty: difficultyEnum("difficulty").default("beginner").notNull(),
  isPublic: boolean("is_public").default(false).notNull(),
  tags: text("tags").array(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const cards = pgTable("cards", {
  id: serial("id").primaryKey(),
  deckId: integer("deck_id")
    .notNull()
    .references(() => decks.id, { onDelete: "cascade" }),
  frontText: text("front_text").notNull(),
  backText: text("back_text").notNull(),
  imageUrl: varchar("image_url", { length: 255 }),
  audioUrl: varchar("audio_url", { length: 255 }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
