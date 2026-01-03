import SqlRepositoryBase from "@/core/db/sql-repository.base";
import { UserEntity } from "../domain/user.entity";
import { UserRepositoryPort } from "./user.repository.port";
import Type, { Static } from "typebox";

export const userSchema = Type.Object({
  id: Type.String(),
  email: Type.String({
    format: "email",
    description: "must be in email format",
  }),
  passwordHash: Type.String(),
  username: Type.String({
    minLength: 1,
  }),
  displayName: Type.Optional(
    Type.String({
      minLength: 1,
    }),
  ),
  bio: Type.Optional(
    Type.String({
      maxLength: 500,
    }),
  ),
  currencyType: Type.String(),
  profilePictureUrl: Type.Optional(Type.String()),
  country: Type.Optional(Type.String()),
  state: Type.Optional(Type.String()),
  city: Type.Optional(Type.String()),
  zipCode: Type.Optional(Type.String()),
  streetAddress: Type.Optional(Type.String()),
  timeZone: Type.String(),
  createdAt: Type.String({ format: "date-time" }),
  updatedAt: Type.String({ format: "date-time" }),
});

export type UserModel = Static<typeof userSchema>;

class UserRepository
  extends SqlRepositoryBase<UserEntity, UserModel>
  implements UserRepositoryPort
{
  constructor({ db, userMapper, logger }) {
    super(db, "users", userMapper, logger);
  }

  async findOneByEmail(email: string): Promise<UserEntity | undefined> {
    const [result] = await this
      .db`SELECT * FROM ${this.db(this.tableName)} WHERE email = ${email}`;
    return result ? this.mapper.toDomain(result) : undefined;
  }
}

export default UserRepository;
