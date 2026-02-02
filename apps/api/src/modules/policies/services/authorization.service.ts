import { CacheServicePort } from "../../../core/cache/cache-service.port";
import { UserPermissionRepositoryPort } from "../database/user-permission.repository.port";
import { AuthorizationServicePort } from "./authorization.service.port";
import {
  ForbiddenErrorException,
  InvalidCredentialsErrorException,
} from "@/core/exceptions";

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

  authorizeAny(userId: string, requiredPermissions: string[]): Promise<void> {
    throw new Error();
  }

  authorizeAll(userId: string, requiredPermissions: string[]): Promise<void> {
    throw new Error();
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

  invalidateUserPermissionCache(userId: string): Promise<void> {
    throw new Error();
  }
}
