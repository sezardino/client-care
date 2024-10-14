import jwt, { VerifyErrors } from "jsonwebtoken";

export type JWTError = VerifyErrors;

type GenerateArgs = {
  payload: Record<string, unknown>;
  expiresIn?: number;
};

export const jwtGenerate = (args: GenerateArgs) => {
  const { payload, expiresIn } = args;

  const secret = process.env.JWT_SECRET;
  if (!secret || typeof secret !== "string")
    throw new Error("Secret not provided");

  return jwt.sign(payload, secret, {
    expiresIn: expiresIn ? expiresIn : "999 years",
  });
};

export const jwtVerify = <T extends Record<string, unknown>>(
  token: string
): T | null => {
  const secret = process.env.JWT_SECRET;
  if (!secret || typeof secret !== "string")
    throw new Error("Secret not provided");

  const decoded = jwt.verify(token, secret);

  return decoded as T;
};

export const jwtDecode = <T extends Record<string, unknown>>(
  token: string
): T | null => {
  const decoded = jwt.decode(token);

  return decoded as T;
};
