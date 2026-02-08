import { Mapper } from "@/core/ddd/mapper.interface";
import { UserEntity } from "./domain/user.entity";
import { UserResponseDto } from "./dtos/user.response.dto";
import { UserModel } from "./database/user.model";

/**
 * Querying data from database to persistence layer: each Model object should contain all key-value (null is counted)
 * Persistence layer to domain: each domain entity model properties store all value (null is counted)
 *
 */

class UserMapper implements Mapper<UserEntity, UserModel, UserResponseDto> {
  /**
   * Transform data model from Domain layer into Persistence layer preparing for database insertion operation
   * @param {UserEntity} entity
   * @returns {UserModel}
   */
  toPersistence(entity: UserEntity): UserModel {
    return {
      id: entity.id,
      isEnabled: entity.isEnabled,
      isDeleted: entity.isDeleted,
      createdBy: entity.createdBy,
      updatedBy: entity.updatedBy,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
      deletedBy: entity.deletedBy,
      email: entity.email,
      passwordHash: entity.passwordHash,
      username: entity.username,
      currencyType: entity.currencyType,
      displayName: entity.displayName,
      bio: entity.bio,
      profilePictureUrl: entity.profilePictureUrl,
      country: entity.country,
      state: entity.state,
      city: entity.city,
      zipCode: entity.zipCode,
      streetAddress: entity.streetAddress,
      timeZone: entity.timeZone,
      tokenVersion: entity.tokenVersion,
    } satisfies UserModel;
  }
  /**
   * Transform user model from database layer to domain layer when performing querying operation
   * @param {UserModel} record
   * @returns {UserEntity}
   */
  toDomain(record: UserModel): UserEntity {
    return UserEntity.fromPersistence({
      id: record.id,
      email: record.email,
      passwordHash: record.passwordHash,
      username: record.username,
      displayName: record.displayName,
      bio: record.bio,
      currencyType: record.currencyType,
      profilePictureUrl: record.profilePictureUrl,
      country: record.country,
      state: record.state,
      city: record.city,
      zipCode: record.zipCode,
      streetAddress: record.streetAddress,
      timeZone: record.timeZone,
      tokenVersion: record.tokenVersion,
      isEnabled: record.isEnabled,
      isDeleted: record.isDeleted,
      createdBy: record.createdBy,
      updatedBy: record.updatedBy,
      deletedAt: record.deletedAt,
      deletedBy: record.deletedBy,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
  }
  /**
   * Transform user data model from domain layer to fastify controller matching with response schema
   * @param {UserEntity} entity
   * @returns {UserResponseDto}
   */
  toResponse(entity: UserEntity): UserResponseDto {
    return {
      id: entity.id,
      isEnabled: entity.isEnabled,
      isDeleted: entity.isDeleted,
      createdBy: entity.createdBy,
      createdAt: entity.createdAt,
      updatedBy: entity.updatedBy,
      updatedAt: entity.updatedAt,
      email: entity.email,
      username: entity.username,
      currencyType: entity.currencyType,
      displayName: entity.displayName,
      bio: entity.bio,
      profilePictureUrl: entity.profilePictureUrl,
      country: entity.country,
      state: entity.state,
      city: entity.city,
      zipCode: entity.zipCode,
      streetAddress: entity.streetAddress,
      timeZone: entity.timeZone,
    } satisfies UserResponseDto;
  }
}

export default UserMapper;
