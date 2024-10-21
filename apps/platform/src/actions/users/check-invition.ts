"use server";

import { CLERK_ID_START_WITH } from "@/const/base";
import { MAX_ORGANIZATION_MEMBERS_COUNT } from "@/const/limits";
import { ProjectUrls } from "@/const/url";
import { prisma } from "@/libs/prisma";
import { ServerActionResponse, SuccessResponse } from "@/types/base";
import { auth } from "@clerk/nextjs/server";
import { redirect, RedirectType } from "next/navigation";

export const checkUserInvite = async (
  inviteId: unknown
): Promise<ServerActionResponse<SuccessResponse>> => {
  const { userId } = auth();

  if (!inviteId || typeof inviteId !== "string")
    return { message: "Unique id is not provided" };

  if (userId) redirect(ProjectUrls.dashboard, RedirectType.replace);

  try {
    const user = await prisma.user.findFirst({
      where: { inviteId: inviteId },
      select: {
        id: true,
        organization: {
          select: {
            id: true,
            _count: { select: { members: { where: { deletedAt: null } } } },
          },
        },
      },
    });

    if (!user) return { message: "User not found" };
    if (!user.organization?.id) {
      await prisma.user.delete({ where: { id: user.id } });
      return { message: "Something went wrong, contact with your supervisor" };
    }
    if (user.organization._count.members <= MAX_ORGANIZATION_MEMBERS_COUNT)
      return {
        message: `Organization can only have ${MAX_ORGANIZATION_MEMBERS_COUNT} members, contact with your supervisor`,
      };

    if (user.id.startsWith(CLERK_ID_START_WITH))
      return { message: `This user already accept invite` };

    return { success: true };
  } catch (error) {
    console.log("error", error);
    return { message: "There was error when try to get current user data" };
  }
};
