"use server";

import { prisma } from "@/libs/prisma";
import { auth } from "@clerk/nextjs/server";

export const getCurrentUserProfile = async () => {
  const { userId } = auth();

  if (!userId) return { message: "Unauthorized" };

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        position: true,
        firstName: true,
        lastName: true,
        avatar: true,
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
    return {
      message: "Something went wrong when try to get current user profile",
    };
  }
};
