import * as bcrypt from "bcrypt";

export interface PasswordServicePort {
  hash(saltRounds: number, value: string): Promise<string>;
  compare(raw: string, hashed: string): Promise<boolean>;
}

class BcryptPasswordService implements PasswordServicePort {
  hash(saltRounds = 10, value: string): Promise<string> {
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
