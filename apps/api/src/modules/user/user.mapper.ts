import { Mapper } from "@/core/ddd/mapper.interface";
import { UserEntity } from "./domain/user.entity";
import { UserModel, UserSchema } from "./database/user.repository";
import { UserResponseDto } from "./dtos/user.response.dto";
import { ajv } from "@/core/utils/validator.util";
import { ArgumentInvalidException } from "@/core/exceptions";
import { randomUUID } from "crypto";

class UserMapper implements Mapper<UserEntity, UserModel, UserResponseDto> {
  toPersistence(user: UserEntity): UserModel {
    const validator = ajv.compile(UserSchema);
    const record: UserModel = user.toObject() as UserModel;
    const validate = validator(record);
    if (!validate) {
      throw new ArgumentInvalidException(
        JSON.stringify(validator.errors),
        new Error("Mapper Validation error"),
        record,
      );
    }

    return record;
  }
  toDomain(record: UserModel): UserEntity {
    return new UserEntity({
      id: randomUUID(),
      email: record.email,
      passwordHash: record.passwordHash,
      username: record.username,
      displayName: record.displayName,
      bio: record.bio,
      currencyType: record.currencyType ?? "USD",
      profilePictureUrl: record.profilePictureUrl,
      country: record.country,
      state: record.state,
      city: record.city,
      zipCode: record.zipCode,
      streetAddress: record.streetAddress,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
  }
  toResponse(_: UserEntity) {
    throw new Error("Method not implemented.");
  }
}

export default UserMapper;
