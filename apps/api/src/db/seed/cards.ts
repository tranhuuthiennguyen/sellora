import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import * as schema from "@db/schema";
import { faker } from "@faker-js/faker";

export const seedCards = async (
  db: PostgresJsDatabase<typeof schema>,
  count: number,
) => {
  const data: (typeof schema.cards.$inferInsert)[] = [];
  const decks = await db
    .select({ id: schema.decks.id, createdAt: schema.decks.createdAt })
    .from(schema.decks);

  for (let i = 0; i < count; i++) {
    const deck = faker.helpers.arrayElement(decks);
    const createdAt = faker.date.between({
      from: deck.createdAt,
      to: new Date(),
    });
    data.push({
      deckId: deck.id,
      frontText: faker.lorem.words(),
      backText: faker.lorem.lines({ min: 1, max: 5 }),
      imageUrl: null,
      audioUrl: null,
      createdAt: createdAt,
      updatedAt: faker.date.between({ from: createdAt, to: new Date() }),
    });
  }

  await db.insert(schema.cards).values(data);
};
