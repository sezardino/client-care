"use server";

import { MAX_ORGANIZATION_PROJECTS_COUNT } from "@/const/limits";
import { NewProjectDtoSchema } from "@/dto/project";
import { prisma } from "@/libs/prisma";
import { uploadProjectLogoToStorage } from "@/libs/supabase/handlers";
import { getFilePublicPath } from "@/libs/supabase/storage";
import { ServerActionResponse } from "@/types/base";
import { stringToSlug } from "@/utils/string-to-slug";
import { zodValidateAndFormatErrors } from "@/utils/zod";
import { auth } from "@clerk/nextjs/server";

export const createNewProject = async (
  args: unknown
): Promise<ServerActionResponse<{ id: string }>> => {
  const { userId } = auth();

  if (!(args instanceof FormData)) return { message: "Invalid input" };

  if (!userId) return { message: "Unauthorized" };

  const dataToValidate = {
    name: args.get("name"),
    logo: args.get("logo"),
    url: args.get("url"),
    description: args.get("description"),
  };

  const validationResponse = zodValidateAndFormatErrors(
    NewProjectDtoSchema,
    dataToValidate
  );

  if (!validationResponse.success)
    return { message: "Invalid input", errors: validationResponse.errors };

  const { logo, name, description, url } = validationResponse.data;

  const slugFromName = stringToSlug(name);

  try {
    const neededOrganization = await prisma.organization.findFirst({
      where: { members: { some: { id: userId } } },
      select: { id: true, _count: { select: { projects: true } } },
    });

    if (!neededOrganization) return { message: "Organization not found" };
    if (neededOrganization._count.projects >= MAX_ORGANIZATION_PROJECTS_COUNT)
      return {
        message: `Projects limit is ${MAX_ORGANIZATION_PROJECTS_COUNT}`,
      };

    const newProject = await prisma.project.create({
      data: {
        name,
        url,
        slug: slugFromName,
        description,
        organization: { connect: { id: neededOrganization.id } },
      },
      select: { id: true },
    });

    const uploadResponse = await uploadProjectLogoToStorage(
      logo,
      neededOrganization.id,
      newProject.id
    );

    if (!uploadResponse || uploadResponse.error) {
      console.log(uploadResponse.error);

      return { message: "Something went wrong wen try to upload logo" };
    }

    await prisma.project.update({
      where: { id: newProject.id },
      data: {
        logo: {
          create: {
            ...uploadResponse.data,
            publicPath: getFilePublicPath(uploadResponse.data.path),
          },
        },
      },
    });

    return { id: newProject.id };
  } catch (error) {
    console.log(error);
    return { message: "There was error when try to create new project" };
  }
};
