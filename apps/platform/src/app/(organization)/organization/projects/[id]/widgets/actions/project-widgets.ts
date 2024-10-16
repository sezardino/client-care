"use server";

import { prisma } from "@/libs/prisma";
import { ServerActionResponse } from "@/types/base";
import { ProjectWidget } from "@/types/widget";
import { zodValidateAndFormatErrors } from "@/utils/zod";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

const ValidationSchema = z.object({
  id: z.string(),
});

type ReturnType = {
  widgets: ProjectWidget[];
};

export const getProjectWidgets = async (
  argument: unknown
): Promise<ServerActionResponse<ReturnType>> => {
  const { userId } = auth();

  if (!userId) return { message: "Unauthorized" };

  const validationResponse = zodValidateAndFormatErrors(ValidationSchema, {
    id: argument,
  });

  if (!validationResponse.success)
    return { message: "Invalid input", errors: validationResponse.errors };

  const { id } = validationResponse.data;

  try {
    const widgets = await prisma.widget.findMany({
      where: {
        projectId: id,
        deletedAt: null,
        organization: {
          members: {
            some: {
              id: userId,
            },
          },
        },
      },
      select: {
        id: true,
        name: true,
        isActive: true,
        isTest: true,
        type: true,
        createdAt: true,
        _count: { select: { submissions: true } },
      },
    });

    return {
      widgets: widgets.map(({ _count, ...widget }) => ({
        ...widget,
        submissionsCount: _count.submissions,
      })),
    };
  } catch (error) {
    console.log("error", error);
    return {
      message: "Something went wrong when try to get current user profile",
    };
  }
};
