import { jwtVerify } from "@/libs/jwt";
import { JWTWidgetPayload } from "@/types/jwt";
import { JsonWebTokenError } from "jsonwebtoken";

export const verifyAuthToken = (token: string) => {
  if (!token || !token.includes("Bearer")) throw new Error("No token provided");

  const tokenWithoutBearer = token.split(" ")[1];

  try {
    const verifiedToken = jwtVerify(tokenWithoutBearer);

    if (!verifiedToken) throw new Error("Verification failed");

    return verifiedToken as JWTWidgetPayload;
  } catch (error) {
    if (error instanceof JsonWebTokenError) throw new Error(error.message);

    if (typeof error === "string") throw new Error(error);

    throw new Error("Something went wrong when try to extract token");
  }
};
