import { UserPermissionRepositoryPort } from "./database/user-permission.repository.port";
import { AuthorizationServicePort } from "./services/authorization.service.port";

declare global {
  export interface Dependencies {
    userPermissionRepository: UserPermissionRepositoryPort;
    authorizationService: AuthorizationServicePort;
  }
}
