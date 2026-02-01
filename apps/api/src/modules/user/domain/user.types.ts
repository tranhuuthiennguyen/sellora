import { UserModel } from "../database/user.model";

export type CreateUserProps = Pick<
  UserModel,
  "email" | "passwordHash" | "username"
>;
