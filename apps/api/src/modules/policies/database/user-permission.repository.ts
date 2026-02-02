import { PermissionModel, RoleModel } from "./permission.model";
import { UserPermissionRepositoryPort } from "./user-permission.repository.port";

export class UserPermissionRepository implements UserPermissionRepositoryPort {
  private readonly _db: Dependencies["db"];

  constructor({ db }) {
    this._db = db;
  }

  async getRolesByUserId(userId: string): Promise<RoleModel[]> {
    const result = await this._db`
      SELECT DISTINCT r.id, r.name, r.description
      FROM roles r
      INNER JOIN user_roles ur ON r.id = ur.role_id
      INNER JOIN users u ON u.id = ur.user_id
      WHERE u.id = ${userId}
        AND u.is_deleted = FALSE
        AND u.is_enabled = TRUE
      ORDER BY r.name;
    `;

    return result.map(
      (r) =>
        ({
          id: r.id,
          name: r.name,
          description: r.description,
        }) as RoleModel,
    );
  }

  async hasPermission(
    userId: string,
    permissionName: string,
  ): Promise<boolean> {
    const result = await this._db`
      SELECT EXISTS(
        SELECT 1
        FROM permissions p
        INNER JOIN role_permissions rp ON p.id = rp.permission_id
        INNER JOIN roles r ON r.id = rp.role_id
        INNER JOIN user_roles ur ON r.id = ur.role_id
        INNER JOIN users u ON u.id = ur.user_id
        WHERE u.id = ${userId}
          AND p.name = ${permissionName}
          AND u.is_deleted = FALSE
          AND u.is_enabled = TRUE
      ) AS has_permission;
    `;

    return result[0]?.has_permission ?? false;
  }

  async assignRoleToUser(userId: string, roleId: number): Promise<void> {
    await this._db`
      INSERT INTO user_roles (user_id, role_id)
      VALUES (${userId}, ${roleId})
      ON CONFLICT DO NOTHING;
    `;
  }

  async removeRoleFromUser(userId: string, roleId: number): Promise<void> {
    await this._db`
      DELETE FROM user_roles
      WHERE user_id = ${userId} AND role_id = ${roleId};
    `;
  }

  async getPermissionsByUserId(userId: string): Promise<PermissionModel[]> {
    const result = await this._db`
      SELECT DESTINCT p.id, p.name, p.description
      FROM permissions p
      INNER JOIN role_permissions rp ON p.id = rp.permission_id
      INNER JOIN roles r ON r.id = rp.role_id
      INNER JOIN user_roles ur ON r.id = ur.role_id
      INNER JOIN users u ON u.id = ur.user_id
      WHERE u.id = ${userId}
        AND u.is_deleted = FALSE
        AND u.is_enabled = TRUE
      ORDER BY p.name;
    `;

    return result.map(
      (r) =>
        ({
          id: r.id,
          name: r.name,
          description: r.description,
        }) as PermissionModel,
    );
  }

  async getPermissionsByRoleId(roleId: string): Promise<PermissionModel[]> {
    const result = await this._db`
      SELECT p.id, p.name, p.description
      FROM permissions p
      INNER JOIN role_permissions rp ON p.id = rp.permission_id
      WHERE rp.role_id = ${roleId}
      ORDER BY p.name;
    `;

    return result.map(
      (r) =>
        ({
          id: r.id,
          name: r.name,
          description: r.description,
        }) as PermissionModel,
    );
  }
}
