import SqlRepositoryBase from "@/core/db/sql-repository.base";
import { UserEntity } from "../domain/user.entity";
import { UserRepositoryPort } from "./user.repository.port";
import { FromSchema } from "json-schema-to-ts";

export const UserSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    id: {
      type: "string",
      maxLength: 255,
    },
    email: {
      type: "string",
      format: "email",
      maxLength: 255,
      description: "Must be unique.",
    },
    passwordHash: {
      type: "string",
      maxLength: 255,
    },
    username: {
      type: "string",
      maxLength: 50,
      description: "Must be unique.",
    },
    displayName: {
      type: "string",
    },
    bio: {
      type: "string",
      maxLength: 255,
    },
    currencyType: {
      type: "string",
      maxLength: 10,
      default: "USD",
    },
    profilePictureUrl: {
      type: "string",
    },
    country: {
      type: "string",
      maxLength: 50,
    },
    state: {
      type: "string",
      maxLength: 50,
    },
    city: {
      type: "string",
      maxLength: 50,
    },
    zipCode: {
      type: "string",
      maxLength: 20,
    },
    streetAddress: {
      type: "string",
      maxLength: 100,
    },
    createdAt: {
      type: "string",
      format: "date-time",
    },
    updatedAt: {
      type: "string",
      format: "date-time",
    },
  },
  required: ["id", "email", "passwordHash", "username", "currencyType"],
} as const;

export type UserModel = FromSchema<typeof UserSchema>;

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
