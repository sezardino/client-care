import { User } from "@prisma/client";

export type CurrentUserData = Pick<
  User,
  "email" | "firstName" | "lastName" | "organizationId" | "position"
> & {
  avatarUrl: string | null;
};
