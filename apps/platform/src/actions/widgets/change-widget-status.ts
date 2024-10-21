"use server";

import { MAX_PROJECT_ACTIVE_WIDGETS_COUNT } from "@/const/limits";
import { WidgetStatusDtoSchemaWithProjectId } from "@/dto/widget";
import { prisma } from "@/libs/prisma";
import { ServerActionResponse, SuccessResponse } from "@/types/base";
import { zodValidateAndFormatErrors } from "@/utils/zod";
import { auth } from "@clerk/nextjs/server";

export const changeWidgetStatus = async (
  argument: unknown
): Promise<ServerActionResponse<SuccessResponse>> => {
  const { userId } = auth();

  if (!userId) return { message: "Unauthorized" };

  const validationResponse = zodValidateAndFormatErrors(
    WidgetStatusDtoSchemaWithProjectId,
    argument
  );

  if (!validationResponse.success)
    return { message: "Invalid input", errors: validationResponse.errors };

  const { widgetId, isActive } = validationResponse.data;

  try {
    const neededWidget = await prisma.widget.findUnique({
      where: {
        id: widgetId,
        organization: { members: { some: { id: userId } } },
        deletedAt: null,
      },
      select: { id: true, isActive: true },
    });

    if (!neededWidget) return { message: "Widget not found" };
    if (neededWidget.isActive === isActive)
      return {
        message: `Widget is already ${isActive ? "active" : "inactive"}`,
      };

    if (isActive) {
      const activeWidgetsCount = await prisma.widget.count({
        where: {
          project: { widgets: { some: { id: widgetId } } },
          deletedAt: null,
          isActive: true,
        },
      });

      if (activeWidgetsCount >= MAX_PROJECT_ACTIVE_WIDGETS_COUNT)
        return {
          message: `Limit for active widgets in one project: ${MAX_PROJECT_ACTIVE_WIDGETS_COUNT}`,
        };
    }

    await prisma.widget.update({ where: { id: widgetId }, data: { isActive } });

    return { success: true };
  } catch (error) {
    console.log("error", error);
    return {
      message: "Something went wrong when try to get current user profile",
    };
  }
};
