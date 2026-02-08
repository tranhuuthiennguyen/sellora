import { CacheServicePort } from "../../../core/cache/cache-service.port";
import { UserPermissionRepositoryPort } from "../database/user-permission.repository.port";
import { AuthorizationServicePort } from "./authorization.service.port";
import { ForbiddenErrorException } from "@/core/exceptions";

export default class AuthorizationService implements AuthorizationServicePort {
  private readonly _cacheService: CacheServicePort;
  private readonly _userPermissionRepository: UserPermissionRepositoryPort;
  private readonly CACHE_TTL = 900;

  constructor({ userPermissionRepository, cacheService }) {
    this._userPermissionRepository = userPermissionRepository;
    this._cacheService = cacheService;
  }

  async authorize(userId: string, requiredPermission: string): Promise<void> {
    const permissions = await this._getUserPermissions(userId);

    if (!permissions.includes(requiredPermission)) {
      throw new ForbiddenErrorException(
        `User does not have permission: ${requiredPermission}`,
      );
    }
  }

  async authorizeAny(
    userId: string,
    requiredPermissions: string[],
  ): Promise<void> {
    const permissions = await this._getUserPermissions(userId);

    const hasPermission = requiredPermissions.some((permission) =>
      permissions.includes(permission),
    );

    if (!hasPermission) {
      throw new ForbiddenErrorException(
        `User does not have any of the required permissions: ${requiredPermissions.join(", ")}`,
      );
    }
  }

  async authorizeAll(
    userId: string,
    requiredPermissions: string[],
  ): Promise<void> {
    const permissions = await this._getUserPermissions(userId);

    const hasAllPermissions = requiredPermissions.every((permission) =>
      permissions.includes(permission),
    );

    if (!hasAllPermissions) {
      throw new ForbiddenErrorException(
        `User does not have all required permissions: ${requiredPermissions.join(", ")}`,
      );
    }
  }

  async _getUserPermissions(userId: string): Promise<string[]> {
    const cacheKey = `permissions:${userId}`;

    // Try cache first
    const cached = await this._cacheService.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    // Fetch from database
    const permissions =
      await this._userPermissionRepository.getPermissionsByUserId(userId);
    const permissionNames = permissions.map((p) => p.name);

    // Cache for 15 minutes
    await this._cacheService.set(
      cacheKey,
      JSON.stringify(permissionNames),
      this.CACHE_TTL,
    );

    return permissionNames;
  }

  async invalidateUserPermissionCache(userId: string): Promise<void> {
    const cacheKey = `permissions:${userId}`;
    await this._cacheService.del(cacheKey);
  }
}
