import { RepositoryPort } from "@/core/db/repository.port";
import { UserEntity } from "../domain/user.entity";

export interface UserRepositoryPort extends RepositoryPort<UserEntity> {
  findOneByEmail(email: string): Promise<UserEntity | undefined>;
  findOneByUsername(username: string): Promise<UserEntity | undefined>;
  updateOne(entity: UserEntity): Promise<UserEntity>;
}
