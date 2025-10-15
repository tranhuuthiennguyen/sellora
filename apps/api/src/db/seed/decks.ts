import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import * as schema from "@api/db/schema";
import { faker } from "@faker-js/faker";

export const seedDecks = async (
  db: PostgresJsDatabase<typeof schema>,
  count: number,
) => {
  const data: (typeof schema.decks.$inferInsert)[] = [];
  const categoryIds: { id: number }[] = await db
    .select({ id: schema.categories.id })
    .from(schema.categories);
  const users = await db
    .select({ id: schema.users.id, createdAt: schema.users.createdAt })
    .from(schema.users);

  for (let i = 0; i < count; i++) {
    const user = faker.helpers.arrayElement(users);
    const createdAt = faker.date.between({
      from: user.createdAt,
      to: new Date(),
    });
    data.push({
      categoryId: faker.helpers.arrayElement(categoryIds).id,
      userId: user.id,
      title: faker.lorem.words({ min: 2, max: 10 }),
      description: faker.lorem.paragraph({ min: 1, max: 5 }),
      difficulty: "beginner",
      isPublic: faker.helpers.arrayElement([true, false]),
      tags: null,
      createdAt: createdAt,
      updatedAt: faker.date.between({ from: createdAt, to: new Date() }),
    });
  }

  await db.insert(schema.decks).values(data);
};
