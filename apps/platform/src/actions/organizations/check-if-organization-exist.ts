import { prisma } from "@/libs/prisma";
import { ServerActionResponse, SuccessResponse } from "@/types/base";

export const checkIfOrganizationExist = async (
  slug: string
): Promise<ServerActionResponse<SuccessResponse>> => {
  try {
    const organization = await prisma.organization.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (organization?.id) return { message: "Organization already exist" };

    return { success: true };
  } catch (error) {
    console.log(error);
    return {
      message: "Something went wrong when try to check if organization exist",
    };
  }
};
