import { prisma } from "@/libs/prisma";
import { ServerActionResponse, SuccessResponse } from "@/types/base";

export const checkIfUserHasNoOrganization = async (
  userId: string
): Promise<ServerActionResponse<SuccessResponse>> => {
  try {
    const neededUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, organizationId: true },
    });

    if (!neededUser) return { message: "User not found" };

    if (neededUser.organizationId)
      return { message: "User already have organization" };

    return { success: true };
  } catch (error) {
    console.log(error);
    return {
      message:
        "Something went wrong when try to check if user has any organization",
    };
  }
};
