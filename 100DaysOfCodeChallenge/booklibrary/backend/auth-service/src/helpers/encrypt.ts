import bcrypt from "bcrypt";

const saltRounds = Number(process.env.HASH_SALT_ROUNDS);

export const convertHashPassword = (password: string) => {
  let hashedPassword: string = bcrypt.hashSync(password, saltRounds);
  return hashedPassword;
};
