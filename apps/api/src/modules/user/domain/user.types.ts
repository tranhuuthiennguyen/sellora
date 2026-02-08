import { BasePersistedProps } from "@/core/ddd/model.base";
import { UserModel } from "../database/user.model";

export type CreateUserProps = Pick<UserModel, "email" | "username">;

export type UserPersistedProps = Omit<UserModel, keyof BasePersistedProps>;
