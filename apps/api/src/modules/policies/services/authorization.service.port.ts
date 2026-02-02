export interface AuthorizationServicePort {
  authorize: (userId: string, requiredPermission: string) => Promise<void>;
  authorizeAny: (
    userId: string,
    requiredPermissions: string[],
  ) => Promise<void>;
  authorizeAll: (
    userId: string,
    requiredPermissions: string[],
  ) => Promise<void>;
  invalidateUserPermissionCache: (userId: string) => Promise<void>;
}
