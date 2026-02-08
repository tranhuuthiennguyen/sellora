import { UserRepositoryPort } from "@/modules/user/database/user.repository.port";

class UsernameService {
  private readonly userRepository: UserRepositoryPort;

  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  private emailToBaseUsername(email: string) {
    const username = email.split("@")[0];
    return username
      ?.toLocaleLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  async generateUniqueUsername(email: string): Promise<string> {
    const base = this.emailToBaseUsername(email);
    let username = base;
    let counter = 1;
    while (true) {
      const user = await this.userRepository.findOneByUsername(username);
      if (!user) return username;
      username = `${base}-${counter}`;
      counter++;
    }
  }
}

export default UsernameService;
