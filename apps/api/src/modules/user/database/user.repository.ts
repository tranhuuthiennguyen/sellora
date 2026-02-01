import SqlRepositoryBase from "@/core/db/sql-repository.base";
import { UserEntity } from "../domain/user.entity";
import { UserRepositoryPort } from "./user.repository.port";
import { UserModel } from "./user.model";

class UserRepository
  extends SqlRepositoryBase<UserEntity, UserModel>
  implements UserRepositoryPort
{
  constructor({ db, userMapper, logger }) {
    super(db, "users", userMapper, logger);
  }

  async updateOneById(id: string, records: Record<string, any>): Promise<any> {
    return await this
      .db`UPDATE ${this.db(this.tableName)} SET ${this.db(records, ...Object.keys(records))} WHERE id = ${id}`;
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
