"use server";

import { prisma } from "@/libs/prisma";
import { ServerActionResponse } from "@/types/base";
import { CurrentUserData } from "@/types/user";
import { auth } from "@clerk/nextjs/server";

export const getCurrentUserData = async (): Promise<
  ServerActionResponse<CurrentUserData>
> => {
  const { userId } = auth();

  if (!userId) return { message: "User not found" };

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        email: true,
        avatar: true,
        firstName: true,
        lastName: true,
        organizationId: true,
      },
    });

    if (!user) return { message: "User not found" };

    const { avatar, ...rest } = user;

    return {
      ...rest,
      avatarUrl: avatar?.publicPath || null,
    };
  } catch (error) {
    console.log("error", error);
    return { message: "There was error when try to get current user data" };
  }
};
