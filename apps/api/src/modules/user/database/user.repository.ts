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
      const rows = await this.db`
        UPDATE ${this.db(this.tableName)}
        SET
          username = ${entity.username},
          display_name = ${entity.displayName},
          bio = ${entity.bio},
          currency_type = ${entity.currencyType},
          profile_picture_url = ${entity.profilePictureUrl},
          country = ${entity.country},
          state = ${entity.state},
          city = ${entity.city},
          zip_code = ${entity.zipCode},
          street_address = ${entity.streetAddress},
          time_zone = ${entity.timeZone},
          updated_at = ${entity.updatedAt},
          updated_by = ${entity.updatedBy}
        WHERE id = ${entity.id}
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
