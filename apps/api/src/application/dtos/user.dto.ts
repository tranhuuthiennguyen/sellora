import { UserInterface } from "@/core/domain/users/user.interface";

export interface UserLoginDto extends UserInterface {
  email: string;
  password: string;
}
