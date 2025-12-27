import { UserLoginDto } from "@/application/dtos/user.dto";
import userRepository from "@/infrastructure/repositories/user.repository";
import { compareHash } from "@/utils/auth";
import { IUseCase } from "../use-case.interface";

export class VerifyUser {
  constructor() {}

  async execute(email: string, password: string) {
    const cred = await userRepository.getCredentialsByEmail(email);
    if (!cred) throw new Error("User not found");

    const isValid = await compareHash(password, cred.passwordHash);
    if (!isValid) throw new Error("Incorrect password");

    return cred.user;
  }
}
