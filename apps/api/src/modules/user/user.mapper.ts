import { Mapper } from "@/core/ddd/mapper.interface";
import { UserEntity } from "./domain/user.entity";
import { UserModel, userSchema } from "./database/user.repository";
import { UserResponseDto } from "./dtos/user.response.dto";
import { ajv } from "@/core/utils/validator.util";
import { ArgumentInvalidException } from "@/core/exceptions";

class UserMapper implements Mapper<UserEntity, UserModel, UserResponseDto> {
  toPersistence(entity: UserEntity): UserModel {
    const validator = ajv.compile(userSchema);
    const record: UserModel = {
      id: entity.id,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      email: entity.email,
      passwordHash: entity.passwordHash,
      username: entity.username,
      currencyType: entity.currencyType,
      displayName: entity.displayName as string | undefined,
      bio: entity.bio as string | undefined,
      profilePictureUrl: entity.profilePictureUrl as string | undefined,
      country: entity.country as string | undefined,
      state: entity.state as string | undefined,
      city: entity.city as string | undefined,
      zipCode: entity.zipCode as string | undefined,
      streetAddress: entity.streetAddress as string | undefined,
      timeZone: entity.timeZone,
      tokenVersion: entity.tokenVersion,
    };
    console.log(record);
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
    return UserEntity.fromPersistence({
      id: record.id,
      email: record.email,
      passwordHash: record.passwordHash,
      username: record.username,
      displayName: record.displayName ?? null,
      bio: record.bio ?? null,
      currencyType: record.currencyType ?? "USD",
      profilePictureUrl: record.profilePictureUrl ?? null,
      country: record.country ?? null,
      state: record.state ?? null,
      city: record.city ?? null,
      zipCode: record.zipCode ?? null,
      streetAddress: record.streetAddress ?? null,
      timeZone: record.timeZone,
      tokenVersion: record.tokenVersion,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
  }
  toResponse(entity: UserEntity): UserResponseDto {
    return {
      id: entity.id,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      email: entity.email,
      username: entity.username,
      currencyType: entity.currencyType,
      displayName: entity.displayName as string | undefined,
      bio: entity.bio as string | undefined,
      profilePictureUrl: entity.profilePictureUrl as string | undefined,
      country: entity.country as string | undefined,
      state: entity.state as string | undefined,
      city: entity.city as string | undefined,
      zipCode: entity.zipCode as string | undefined,
      streetAddress: entity.streetAddress as string | undefined,
      timeZone: entity.timeZone,
    };
  }
}

export default UserMapper;
