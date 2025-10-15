import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import * as schema from "@api/db/schema"
import { faker } from '@faker-js/faker'

export const categories = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "History",
  "Geography",
  "English Literature",
  "Economics",
  "Computer Science",
  "Philosophy",
  "Art",
  "Music",
];


export const seedCategories = async (db: PostgresJsDatabase<typeof schema>) => {
  const data: (typeof schema.categories.$inferInsert)[] = []

  for (let i = 0; i < categories.length; i++) {
    data.push({
      title: categories[i]!,
      description: faker.lorem.paragraph({ min: 1, max: 3}),
      iconUrl: null,
      createdAt: faker.date.past({ years: 2}),
      updatedAt: faker.date.recent({ days: 100}),
    })
    
  }
  await db.insert(schema.categories).values(data)
}