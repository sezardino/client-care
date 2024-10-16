"use server";

import { prisma } from "@/libs/prisma";
import { ServerActionResponse, SuccessResponse } from "@/types/base";
import { zodValidateAndFormatErrors } from "@/utils/zod";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

const ValidationSchema = z.object({
  id: z.string(),
});

export const deleteWidget = async (
  argument: unknown
): Promise<ServerActionResponse<SuccessResponse>> => {
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
      select: { id: true },
    });

    if (!neededWidget) return { message: "Widget not found" };

    await prisma.$transaction([
      prisma.widget.update({ where: { id }, data: { deletedAt: new Date() } }),
      prisma.submission.updateMany({
        where: { widgetId: id },
        data: { deletedAt: new Date() },
      }),
    ]);

    return { success: true };
  } catch (error) {
    console.log("error", error);
    return {
      message: "Something went wrong when try to get current user profile",
    };
  }
};
