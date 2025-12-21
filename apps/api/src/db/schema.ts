import {
  pgTable,
  timestamp,
  varchar,
  serial,
  integer,
  boolean,
  bigint,
  text,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  username: varchar("username", { length: 50 }).notNull().unique(),
  displayName: varchar("display_name", { length: 100 }),
  bio: varchar("bio", { length: 255 }),
  currencyType: varchar("currency_type", { length: 10 })
    .notNull()
    .default("USD"),
  profilePictureUrl: varchar("profile_picture_url"),
  country: varchar("country", { length: 50 }),
  state: varchar("state", { length: 50 }),
  city: varchar("city", { length: 50 }),
  zipCode: varchar("zip_code", { length: 20 }),
  streetAddress: varchar("street_address", { length: 100 }),
  timezone: varchar("timezone").default("Pacific Time (US & Canada)"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// export const products = pgTable("products", {
//   id: serial("id").primaryKey(),
//   sellerId: integer("id").notNull().references(() => users.id, { onDelete: 'cascade'}),
//   title: varchar("title").notNull(),
//   description: varchar("description"),
//   priceCents: integer("price_cents").notNull().default(0),
//   published: boolean("published").notNull().default(false),
//   createdAt: timestamp("created_at", { withTimezone: true })
//     .notNull(),
//   updatedAt: timestamp("updated_at", { withTimezone: true })
//     .notNull()
// })

// export const productFiles = pgTable("product_files", {
//   id: serial("id").primaryKey(),
//   productId: integer("product_id").notNull().references(() => products.id, {onDelete: "cascade"}),
//   storageKey: text("storage_key").notNull(),
//   mimeType: varchar("mime_type", { length: 255}),
//   sizeBytes: integer("size_bytes"),
//   createdAt: timestamp("created_at", { withTimezone: true })
//     .notNull(),
// })

// export const sellerProfileSections = pgTable("seller_profile_sections", {
//   sellerId: integer("seller_id").primaryKey().references(() => users.id, { onDelete: 'cascade'}),
//   header: varchar("header").notNull(),
//   productId: integer("product_id").references(() => products.id),
//   createdAt: timestamp("created_at", { withTimezone: true })
//     .notNull(),
//   updatedAt: timestamp("updated_at", { withTimezone: true })
//     .notNull()
// })

// export const sellerProfiles = pgTable("seller_profiles", {
//   sellerId: integer("seller_id").primaryKey().references(() => users.id, { onDelete: 'cascade'}),
//   highlightColor: varchar("highlight_color"),
//   backgroundColor: varchar("background_color"),
//   font: varchar("font"),
//   createdAt: timestamp("created_at", { withTimezone: true })
//     .notNull(),
//   updatedAt: timestamp("updated_at", { withTimezone: true })
//     .notNull()
// })

// export const tags = pgTable("tags", {
//   name: varchar("name", { length: 100 }).primaryKey().unique(),
//   createdAt: timestamp("created_at", { withTimezone: true })
//     .notNull(),
//   updatedAt: timestamp("updated_at", { withTimezone: true })
//     .notNull(),
//   humanizedName: varchar("humanized_name", { length: 191}),
//   flaggedAt: timestamp("updated_at", { withTimezone: true })
//     .notNull()
// })

// export const productTaggings = pgTable("product_taggings", {
//   tagId: serial("tag_id"),
//   productId: integer("product_id").notNull().references(() => products.id, {onDelete:'cascade'}),
//   createdAt: timestamp("created_at", { withTimezone: true })
//     .notNull(),
//   updatedAt: timestamp("updated_at", { withTimezone: true })
//     .notNull(),
// })

// export const categories = pgTable("categories", {
//   slug: varchar("slug", { length: 100 }).primaryKey().unique(),
//   createdAt: timestamp("created_at", { withTimezone: true })
//     .notNull(),
//   updatedAt: timestamp("updated_at", { withTimezone: true })
//     .notNull(),
// })

// export const productCategories = pgTable("product_categories", {
//   id: serial("id").primaryKey(),
//   productId: integer("product_id").notNull().references(() => products.id, {onDelete: 'cascade'}),
//   categoryId: integer("category_id").notNull().references(() => categories.slug, {onDelete: 'cascade'})
// })

// export const carts = pgTable("carts", {
//   id: serial("id").primaryKey(),
//   purchaserId: integer("purchaser_id").notNull().references(() => users.id, {onDelete: 'cascade'}),
//   sellerId: integer("seller_id").notNull().references(() => users.id, {onDelete: 'cascade'}),
//   createdAt: timestamp("created_at", { withTimezone: true })
//     .notNull(),
//   updatedAt: timestamp("updated_at", { withTimezone: true })
//     .notNull(),
// })

// export const cartProducts = pgTable("cart_products", {
//   id: serial("id").primaryKey(),
//   cartId: integer("cart_id").notNull().references(() => carts.id, {onDelete:'cascade'}),
//   productId: integer("product_id")
//     .notNull()
//     .references(() => products.id, { onDelete: "cascade" }),
//   quantity: integer("quantity").notNull().default(1),
//   createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
//   updatedAt: timestamp("updated_at", { withTimezone: true }).notNull(),
// })

// export const orders = pgTable("orders", {
//   id: serial("id").primaryKey(),
//   purchaserId: integer("purchaser_id")
//     .notNull()
//     .references(() => users.id),
//   sellerId: integer("seller_id")
//     .notNull()
//     .references(() => users.id),
//   totalPaid: integer("total_paid").notNull(),
//   currency: varchar("currency", { length: 10 }).notNull(),
//   paymentStatus: varchar("payment_status", { length: 50 })
//     .notNull()
//     .default("paid"),
//   // paymentProcessorId: varchar("payment_processor_id"), // Stripe or mock
//   createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
// });

// export const purchases = pgTable("purchases", {
//   id: serial("id").primaryKey(),
//   orderId: integer("order_id")
//     .notNull()
//     .references(() => orders.id, { onDelete: "cascade" }),
//   productId: integer("product_id")
//     .notNull()
//     .references(() => products.id),
//   buyerId: uuid("buyer_id")
//     .notNull()
//     .references(() => users.id),
//   sellerId: uuid("seller_id")
//     .notNull()
//     .references(() => users.id),
//   pricePaid: integer("price_paid").notNull(),
//   currency: varchar("currency", { length: 10 }).notNull(),
//   createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
// });
