"use server";

import { MAX_PROJECT_ACTIVE_WIDGETS_COUNT } from "@/const/limits";
import { prisma } from "@/libs/prisma";
import { CreateWidgetDtoSchema } from "@/schemas/dto/widget";
import { ServerActionResponse } from "@/types/base";
import { generateWidgetCodeSnippet } from "@/utils/generate-widget-code-snippet";
import { zodValidateAndFormatErrors } from "@/utils/zod";
import { auth } from "@clerk/nextjs/server";
import { WidgetType } from "@prisma/client";

export const createWidget = async (
  args: unknown
): Promise<ServerActionResponse<{ id: string; snippet: string[] }>> => {
  const { userId } = auth();

  if (!userId) return { message: "Unauthorized" };

  const validationResponse = zodValidateAndFormatErrors(
    CreateWidgetDtoSchema,
    args
  );

  if (!validationResponse.success)
    return { message: "Invalid input", errors: validationResponse.errors };

  const { name, isActive, projectId } = validationResponse.data;

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
          select: { widgets: { where: { deletedAt: null, isActive: true } } },
        },
      },
    });

    if (!neededProject) return { message: "Project not found" };
    if (
      isActive &&
      neededProject._count.widgets >= MAX_PROJECT_ACTIVE_WIDGETS_COUNT
    )
      return {
        message: `Projects test widgets limit is ${MAX_PROJECT_ACTIVE_WIDGETS_COUNT}`,
      };

    const widget = await prisma.widget.create({
      data: {
        name,
        isActive,
        type: WidgetType.FEEDBACK,
        organization: { connect: { id: neededProject.organizationId } },
        project: { connect: { id: neededProject.id } },
      },
      select: { id: true, organizationId: true, projectId: true },
    });

    const snippet = generateWidgetCodeSnippet({
      organizationId: widget.organizationId,
      projectId: widget.projectId,
      widgetId: widget.id,
    });

    return { id: widget.id, snippet };
  } catch (error) {
    console.log(error);
    return { message: "There was error when try to create widget" };
  }
};
