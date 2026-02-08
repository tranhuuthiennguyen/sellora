import bcrypt from "bcrypt";

export function hash(value: string, saltRounds = 10): Promise<string> {
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

export function compare(password: string, encrypted: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, encrypted, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}
