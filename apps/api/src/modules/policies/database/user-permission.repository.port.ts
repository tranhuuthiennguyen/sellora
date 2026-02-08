import { PermissionModel, RoleModel } from "./permission.model";

export interface UserPermissionRepositoryPort {
  getPermissionsByUserId(userId: string): Promise<PermissionModel[]>;
  getPermissionsByRoleId(roleId: string): Promise<PermissionModel[]>;
  getRolesByUserId(userId: string): Promise<RoleModel[]>;
  hasPermission(userId: string, permissionName: string): Promise<boolean>;
  assignRoleToUser(userId: string, roleId: number): Promise<void>;
  removeRoleFromUser(userId: string, roleId: number): Promise<void>;
}
