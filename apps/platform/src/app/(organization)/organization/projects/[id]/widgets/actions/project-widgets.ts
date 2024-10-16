"use server";

import { prisma } from "@/libs/prisma";
import { PaginationResponse, ServerActionResponse } from "@/types/base";
import { ProjectWidget } from "@/types/widget";
import { getBackendPagination } from "@/utils/get-pagination";
import { zodValidateAndFormatErrors } from "@/utils/zod";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

const ValidationSchema = z.object({
  id: z.string(),
  page: z.number().optional(),
  limit: z.number().optional(),
});

export const getProjectWidgets = async (
  argument: unknown
): Promise<ServerActionResponse<PaginationResponse<ProjectWidget>>> => {
  const { userId } = auth();

  if (!userId) return { message: "Unauthorized" };

  const validationResponse = zodValidateAndFormatErrors(
    ValidationSchema,
    argument
  );

  if (!validationResponse.success)
    return { message: "Invalid input", errors: validationResponse.errors };

  const { id, page, limit } = validationResponse.data;

  try {
    const widgetsWhereInput = {
      projectId: id,
      deletedAt: null,
      organization: {
        members: {
          some: {
            id: userId,
          },
        },
      },
    };

    const widgetsTotalCount = await prisma.widget.count({
      where: widgetsWhereInput,
    });

    const { skip, take, meta } = getBackendPagination({
      page,
      limit,
      count: widgetsTotalCount,
    });

    const widgets = await prisma.widget.findMany({
      where: widgetsWhereInput,
      skip,
      take,
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
      data: widgets.map(({ _count, ...widget }) => ({
        ...widget,
        submissionsCount: _count.submissions,
      })),
      meta,
    };
  } catch (error) {
    console.log("error", error);
    return {
      message: "Something went wrong when try to get current user profile",
    };
  }
};
