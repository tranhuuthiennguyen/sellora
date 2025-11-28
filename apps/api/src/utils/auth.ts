import * as bcrypt from "bcrypt";

export const genSalt = (saltRounds: number, value: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) return reject(err);
      bcrypt.hash(value, salt, (err, hash) => {
        if (err) return reject(err);
        resolve(hash);
      });
    });
  });
};

export const compareHash = (value: string, hash: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(value, hash, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
