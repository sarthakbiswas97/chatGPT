import jwt from "jsonwebtoken";

export const createToken = (id: string, email: string, expiresIn: string) => {
  const payload = { id, email };
  const KEY: string = process.env.JWT_KEY ?? "";
  const token = jwt.sign(payload, KEY, {
    expiresIn,
  });
  return token;
};
