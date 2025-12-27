import { UserInterface } from "@/core/domain/users/user.interface";

export interface IUserRepository {
  save: (payload: any) => Promise<UserInterface | undefined>;
  findAll: () => Promise<UserInterface[]>;
  findOne: (email: string) => Promise<UserInterface | undefined>;
  updateById: (
    id: number,
    payload: Record<string, unknown>,
  ) => Promise<UserInterface | undefined>;
  deleteById: (id: number) => Promise<UserInterface | undefined>;
}
