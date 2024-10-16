"use server";

import { jwtGenerate } from "@/libs/jwt";
import { prisma } from "@/libs/prisma";
import { ServerActionResponse } from "@/types/base";
import { zodValidateAndFormatErrors } from "@/utils/zod";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

const ValidationSchema = z.object({
  id: z.string(),
});

const getWidgetCodeSnippetString = (token: string): string[] => [
  `<feedback-widget token="${token}"></feedback-widget>`,
  `<script src="${process.env.WIDGET_SCRIPT_PATH}" />`,
];

export const getWidgetCodeSnippet = async (
  argument: unknown
): Promise<ServerActionResponse<{ snippet: string[] }>> => {
  const { userId } = auth();

  if (!userId) return { message: "Unauthorized" };

  const validationResponse = zodValidateAndFormatErrors(ValidationSchema, {
    id: argument,
  });

  if (!validationResponse.success)
    return { message: "Invalid input", errors: validationResponse.errors };

  const { id } = validationResponse.data;

  try {
    const neededWidget = await prisma.widget.findUnique({
      where: {
        id,
        organization: { members: { some: { id: userId } } },
        deletedAt: null,
      },
      select: { id: true, projectId: true, organizationId: true },
    });

    if (!neededWidget) return { message: "Widget not found" };
    const token = jwtGenerate({
      payload: {
        projectId: neededWidget.projectId,
        organizationId: neededWidget.organizationId,
        widgetId: neededWidget.id,
      },
    });

    return { snippet: getWidgetCodeSnippetString(token) };
  } catch (error) {
    console.log("error", error);
    return {
      message: "Something went wrong when try to get current user profile",
    };
  }
};
