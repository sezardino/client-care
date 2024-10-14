import { User } from "@prisma/client";

export const getUserInfo = (
  user: Pick<User, "email" | "firstName" | "lastName">
) =>
  user.firstName && user.lastName
    ? `${user.firstName} ${user.lastName}`
    : `${user.email}`;
