import { ICommandBus } from "@/core/cqrs/bus.types";
import { userActionCreator } from "../..";
import { UserRepositoryPort } from "../../database/user.repository.port";
import { UserNotFoundError } from "../../domain/user.error";
import { UserEntity } from "../../domain/user.entity";
import { CacheServicePort } from "@/core/cache/cache-service.port";

export type UpdateUserCommandResult = Promise<UserEntity>;
export const updateUserCommand = userActionCreator.actionCreator<{
  userId: string;
  profile?: {
    displayName?: string | null;
    bio?: string | null;
    profilePictureUrl?: string | null;
  };
  address?: {
    country?: string | null;
    state?: string | null;
    city?: string | null;
    zipCode?: string | null;
    streetAddress?: string | null;
  };
  preferences?: {
    currencyType?: string;
    timeZone?: string;
  };
}>("update");

class UpdateUserHandler {
  private readonly commandBus: ICommandBus;
  private readonly userRepository: UserRepositoryPort;
  private readonly cacheService: CacheServicePort;

  constructor({ commandBus, userRepository, cacheService }) {
    this.commandBus = commandBus;
    this.userRepository = userRepository;
    this.cacheService = cacheService;
  }

  async handler({ payload }: ReturnType<typeof updateUserCommand>) {
    const { userId, profile, address, preferences } = payload;
    const user = await this.userRepository.findOneById(userId);
    if (!user) {
      throw new UserNotFoundError();
    }

    let hasChanges = false;

    if (profile) {
      const changed = user.updateProfile(profile, userId);
      hasChanges = hasChanges || changed;
    }

    if (address) {
      const changed = user.updateAddress(address, userId);
      hasChanges = hasChanges || changed;
    }

    if (preferences) {
      const changed = user.updatePreferences(preferences, userId);
      hasChanges = hasChanges || changed;
    }

    if (!hasChanges) {
      return user;
    }

    const updated = await this.userRepository.updateOne(user);

    await this.cacheService.del(`user:${userId}`);
    updated.clearDomainEvents();

    return updated;
  }

  init() {
    this.commandBus.register(updateUserCommand.type, this.handler.bind(this));
  }
}

export default UpdateUserHandler;
