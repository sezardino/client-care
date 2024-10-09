"use server";

import { prisma } from "@/libs/prisma";
import { NewOrganizationFormSchema } from "@/schemas/organization";
import { ServerActionResponse, SuccessResponse } from "@/types/base";
import { zodValidateAndFormatErrors } from "@/utils/zod";
import { auth } from "@clerk/nextjs/server";

export const createOrganization = async (
  args: unknown
): Promise<ServerActionResponse<SuccessResponse>> => {
  const { userId } = auth();

  if (!userId) return { message: "Unauthorized" };

  const validationResponse = zodValidateAndFormatErrors(
    NewOrganizationFormSchema,
    args
  );

  if (!validationResponse.success)
    return { message: "Invalid input", errors: validationResponse.errors };

  // return { success: true };

  try {
    const neededUser = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        organizationId: true,
        role: true,
        owner: { select: { id: true } },
      },
    });

    console.log(neededUser);

    if (!neededUser) return { message: "User not found" };

    const { id, organizationId, owner, role } = neededUser;
    const { name, slug } = validationResponse.data;

    if (role !== "OWNER") return { message: "Access denied" };
    if (!!organizationId || !!owner?.id)
      return { message: "This user already have organization" };

    const organizationWithSameSlug = await prisma.organization.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!!organizationWithSameSlug?.id)
      return { message: "This slug already in use" };

    await prisma.organization.create({
      data: {
        name,
        slug,
        owner: { connect: { id } },
        members: { connect: { id } },
      },
    });

    return { success: true };
  } catch (error) {
    console.log("error", error);
    return { message: "There was error when try to get current user data" };
  }
};
