import SqlRepositoryBase from "@/core/db/sql-repository.base";
import { UserEntity } from "../domain/user.entity";
import { UserRepositoryPort } from "./user.repository.port";
import { UserModel } from "./user.model";
import { DatabaseErrorException } from "@/core/exceptions";

class UserRepository
  extends SqlRepositoryBase<UserEntity, UserModel>
  implements UserRepositoryPort
{
  constructor({ db, userMapper, logger }) {
    super(db, "users", userMapper, logger);
  }

  async updateOne(entity: UserEntity): Promise<UserEntity> {
    try {
      const record = this.mapper.toPersistence(entity);

      const updates = {
        username: record.username,
        displayName: record.displayName,
        bio: record.bio,
        profilePictureUrl: record.profilePictureUrl,
        country: record.country,
        state: record.state,
        city: record.city,
        zipCode: record.zipCode,
        streetAddress: record.streetAddress,
        currencyType: record.currencyType,
        timeZone: record.timeZone,
        tokenVersion: record.tokenVersion,
        updatedAt: record.updatedAt,
        updatedBy: record.updatedBy,
      };

      const rows = await this.db`
        UPDATE ${this.db(this.tableName)}
        SET ${this.db(updates)}
        WHERE id = ${record.id}
        RETURNING *
      `;
      return this.mapper.toDomain(rows[0]);
    } catch (error: any) {
      throw new DatabaseErrorException("Unknown database error", error);
    }
  }

  async findOneByUsername(username: string): Promise<UserEntity | undefined> {
    const [result] = await this
      .db`SELECT * FROM ${this.db(this.tableName)} WHERE username = ${username}`;
    return result ? this.mapper.toDomain(result) : undefined;
  }

  async findOneByEmail(email: string): Promise<UserEntity | undefined> {
    const [result] = await this
      .db`SELECT * FROM ${this.db(this.tableName)} WHERE email = ${email}`;
    return result ? this.mapper.toDomain(result) : undefined;
  }
}

export default UserRepository;
