"use server";

import { NewOrganizationDtoSchema } from "@/dto/organization";
import { prisma } from "@/libs/prisma";
import { uploadOrganizationLogoToStorage } from "@/libs/supabase/handlers";
import { getFilePublicPath } from "@/libs/supabase/storage";
import { ServerActionResponse, SuccessResponse } from "@/types/base";
import { stringToSlug } from "@/utils/string-to-slug";
import { zodValidateAndFormatErrors } from "@/utils/zod";
import { auth } from "@clerk/nextjs/server";
import { checkIfOrganizationExist } from "./check-if-organization-exist";
import { checkIfUserHasNoOrganization } from "./check-if-user-has-no-organizations";

export const createOrganization = async (
  args: unknown
): Promise<ServerActionResponse<SuccessResponse>> => {
  const { userId } = auth();

  if (!(args instanceof FormData)) return { message: "Invalid input" };

  if (!userId) return { message: "Unauthorized" };

  const dataToValidate = {
    name: args.get("name"),
    logo: args.get("logo"),
    extra: args.get("extra") || undefined,
  };

  const validationResponse = zodValidateAndFormatErrors(
    NewOrganizationDtoSchema,
    dataToValidate
  );

  if (!validationResponse.success)
    return { message: "Invalid input", errors: validationResponse.errors };

  const { logo, name, extra } = validationResponse.data;

  const userHasNoOrganizationResponse = await checkIfUserHasNoOrganization(
    userId
  );

  if ("message" in userHasNoOrganizationResponse)
    return userHasNoOrganizationResponse;

  const slugFromName = stringToSlug(name);
  const organizationExistResponse = await checkIfOrganizationExist(
    slugFromName
  );

  if ("message" in organizationExistResponse) return organizationExistResponse;

  try {
    const newOrganization = await prisma.organization.create({
      data: {
        name,
        extra,
        slug: slugFromName,
        owner: { connect: { id: userId } },
        members: { connect: { id: userId } },
      },
      select: { id: true },
    });

    const uploadResponse = await uploadOrganizationLogoToStorage(
      logo,
      newOrganization.id
    );

    if (!uploadResponse || uploadResponse.error) {
      console.log(uploadResponse.error);

      return {
        message: "Something went wrong wen try to upload a new avatar image",
      };
    }

    await prisma.organization.update({
      where: { id: newOrganization.id },
      data: {
        logo: {
          create: {
            ...uploadResponse.data,
            publicPath: getFilePublicPath(uploadResponse.data.path),
          },
        },
      },
    });

    return { success: true };
  } catch (error) {
    console.log(error);
    return { message: "There was error when try to create new organization" };
  }
};
