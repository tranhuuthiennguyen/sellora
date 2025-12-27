import DbConnection from "../database/dbConnection";
import { UserInterface } from "@/core/domain/users/user.interface";
import { eq } from "drizzle-orm";
import { users } from "@infrastructure/database/schema";
import { IUserRepository } from "@/application/ports/UsersRepository";

class PgUserRepository implements IUserRepository {
  public dbCon: DbConnection;

  constructor() {
    this.dbCon = new DbConnection();
  }

  async save(payload: {
    email: string;
    passwordHash: string;
    username: string;
  }): Promise<UserInterface | undefined> {
    const { email, passwordHash, username } = payload;
    return (
      await this.dbCon.db
        .insert(users)
        .values({
          email: email,
          passwordHash: passwordHash,
          username: username,
        })
        .returning({
          id: users.id,
          email: users.email,
          username: users.username,
          displayName: users.displayName,
          bio: users.bio,
          currencyType: users.currencyType,
          profilePictureUrl: users.profilePictureUrl,
          country: users.country,
          state: users.state,
          city: users.city,
          zipCode: users.zipCode,
          streetAddress: users.streetAddress,
          timezone: users.timezone,
          createdAt: users.createdAt,
          updatedAt: users.updatedAt,
        })
    )[0];
  }

  async findAll(): Promise<UserInterface[]> {
    return await this.dbCon.db.select().from(users);
  }

  async findOne(email: string): Promise<UserInterface | undefined> {
    const result = await this.dbCon.db.query.users.findFirst({
      columns: {
        passwordHash: false,
      },
      where: eq(users.email, email),
    });
    return result;
  }

  async updateById(
    id: number,
    payload: Record<string, unknown>,
  ): Promise<UserInterface | undefined> {
    const updates = {
      ...payload,
      updatedAt: new Date(),
    };

    const [updated] = await this.dbCon.db
      .update(users)
      .set(updates)
      .where(eq(users.id, id))
      .returning();

    return updated;
  }

  async getCredentialsByEmail(email: string) {
    const result = await this.dbCon.db.query.users.findFirst({
      where: eq(users.email, email),
    });
    if (!result) return null;

    const { passwordHash, ...user } = result;

    return {
      passwordHash,
      user,
    };
  }

  async deleteById(id: number): Promise<UserInterface | undefined> {
    return (
      await this.dbCon.db.delete(users).where(eq(users.id, id)).returning()
    )[0];
  }
}

export default new PgUserRepository();
