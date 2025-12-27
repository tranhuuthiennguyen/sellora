import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import * as schema from "@infrastructure/database/schema";
import { faker } from "@faker-js/faker";
import * as bcrypt from "bcrypt";

export const seedUsers = async (
  db: PostgresJsDatabase<typeof schema>,
  count: number,
) => {
  const data: (typeof schema.users.$inferInsert)[] = [];

  for (let i = 0; i < count; i++) {
    const password = faker.internet.password({ length: 12 });
    const passwordHash = await bcrypt.hash(password, 10);
    const createdAt = faker.date.past({ years: 2 });
    data.push({
      email: faker.internet.email(),
      passwordHash: passwordHash,
      username: faker.internet.username(),
      displayName: faker.internet.displayName(),
      bio: faker.lorem.paragraph(),
      currencyType: faker.finance.currencyCode(),
      profilePictureUrl: null,
      country: faker.location.country(),
      state: faker.location.state(),
      city: faker.location.city(),
      zipCode: faker.location.zipCode(),
      streetAddress: faker.location.streetAddress(true),
      createdAt: createdAt,
      updatedAt: faker.date.between({ from: createdAt, to: new Date() }),
    });
  }

  await db.insert(schema.users).values(data);
};
