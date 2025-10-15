import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import * as schema from "@api/db/schema"
import { faker } from '@faker-js/faker'
import * as bcrypt from 'bcrypt'

export const seedUsers = async (db: PostgresJsDatabase<typeof schema>, count: number) => {
  const data: (typeof schema.users.$inferInsert)[] = []
  for (let i = 0; i < count; i++) {
    const password = faker.internet.password({ length: 12 })
    const passwordHash = await bcrypt.hash(password, 10)
    const createdAt = faker.date.past({ years: 2})
    data.push({
      username: faker.internet.username(),
      email: faker.internet.email(),
      passwordHash: passwordHash,
      role: "user",
      avatarUrl: null,
      createdAt: createdAt,
      updatedAt: faker.date.between({from: createdAt, to: new Date()}),
    })
    
  }
  await db.insert(schema.users).values(data)
}