"use server";

import { MAX_PROJECT_WIDGETS_COUNT } from "@/const/limits";
import { NewWidgetDtoSchemaWithProjectId } from "@/dto/widget";
import { prisma } from "@/libs/prisma";
import { ServerActionResponse, SuccessResponse } from "@/types/base";
import { zodValidateAndFormatErrors } from "@/utils/zod";
import { auth } from "@clerk/nextjs/server";
import { WidgetType } from "@prisma/client";

export const createWidget = async (
  args: unknown
): Promise<ServerActionResponse<SuccessResponse>> => {
  const { userId } = auth();

  if (!userId) return { message: "Unauthorized" };

  const validationResponse = zodValidateAndFormatErrors(
    NewWidgetDtoSchemaWithProjectId,
    args
  );

  if (!validationResponse.success)
    return { message: "Invalid input", errors: validationResponse.errors };

  const { name, isTest, projectId } = validationResponse.data;

  try {
    const neededProject = await prisma.project.findFirst({
      where: {
        id: projectId,
        organization: { members: { some: { id: userId } } },
      },
      select: {
        id: true,
        organizationId: true,
        _count: {
          select: { widgets: { where: { deletedAt: null, isTest: false } } },
        },
      },
    });

    if (!neededProject) return { message: "Project not found" };
    if (neededProject._count.widgets >= MAX_PROJECT_WIDGETS_COUNT)
      return {
        message: `Projects widgets limit is ${MAX_PROJECT_WIDGETS_COUNT}`,
      };

    await prisma.widget.create({
      data: {
        name,
        isTest,
        type: WidgetType.FEEDBACK,
        organization: { connect: { id: neededProject.organizationId } },
        project: { connect: { id: neededProject.id } },
      },
      select: { id: true },
    });

    return { success: true };
  } catch (error) {
    console.log(error);
    return { message: "There was error when try to create widget" };
  }
};
