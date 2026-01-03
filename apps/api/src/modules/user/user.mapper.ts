import { Mapper } from "@/core/ddd/mapper.interface";
import { UserEntity } from "./domain/user.entity";
import { UserModel, userSchema } from "./database/user.repository";
import { UserResponseDto } from "./dtos/user.response.dto";
import { ajv } from "@/core/utils/validator.util";
import { ArgumentInvalidException } from "@/core/exceptions";

class UserMapper implements Mapper<UserEntity, UserModel, UserResponseDto> {
  toPersistence(user: UserEntity): UserModel {
    const validator = ajv.compile(userSchema);
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
      id: record.id,
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
      timeZone: record.timeZone,
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
