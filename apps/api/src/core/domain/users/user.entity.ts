import { UserInterface } from "./user.interface";

export class User {
  public readonly id?: number;

  constructor(data: UserInterface) {
    this.id = data.id;
  }
}
