import * as bcrypt from "bcrypt";

export interface PasswordServicePort {
  hash(value: string, saltRounds?: number): Promise<string>;
  compare(raw: string, hashed: string): Promise<boolean>;
  update(email: string, newPassword: string): Promise<any>;
}

class BcryptPasswordService implements PasswordServicePort {
  private readonly db: Dependencies["db"];

  constructor({ db }) {
    this.db = db;
  }

  async update(email: string, newPassword: string): Promise<any> {
    const newPasswordHashed = await this.hash(newPassword);

    const result = await this.db`
      UPDATE users
      SET password_hash = ${newPasswordHashed}
      WHERE email = ${email}
      RETURNING email
    `;

    return result;
  }

  hash(value: string, saltRounds = 10): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) return reject(err);
        bcrypt.hash(value, salt, (err, hash) => {
          if (err) return reject(err);
          resolve(hash);
        });
      });
    });
  }

  compare(raw: string, hashed: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(raw, hashed, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }
}

export default BcryptPasswordService;
