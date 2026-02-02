import { BasePersistedProps } from "@/core/ddd/model.base";
import { UserModel } from "../database/user.model";

export type CreateUserProps = Pick<UserModel, "email" | "username"> & {
  password: string;
};

export type UserPersistedProps = Omit<UserModel, keyof BasePersistedProps>;
