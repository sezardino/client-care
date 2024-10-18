"use server";

import { prisma } from "@/libs/prisma";
import { PaginationResponse, ServerActionResponse } from "@/types/base";
import { SubmissionTable } from "@/types/table";
import { getBackendPagination } from "@/utils/get-pagination";
import { zodValidateAndFormatErrors } from "@/utils/zod";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

const ValidationSchema = z.object({
  projectId: z.string(),
  page: z.number().optional(),
  limit: z.number().optional(),
});

export const getProjectSubmissions = async (
  argument: unknown
): Promise<ServerActionResponse<PaginationResponse<SubmissionTable>>> => {
  const { userId } = auth();

  if (!userId) return { message: "Unauthorized" };

  const validationResponse = zodValidateAndFormatErrors(
    ValidationSchema,
    argument
  );

  if (!validationResponse.success)
    return { message: "Invalid input", errors: validationResponse.errors };

  const { projectId, page, limit } = validationResponse.data;

  try {
    const submissionsWhereInput = {
      projectId,
      organization: { members: { some: { id: userId } } },
    };

    const widgetsTotalCount = await prisma.submission.count({
      where: submissionsWhereInput,
    });

    const { skip, take, meta } = getBackendPagination({
      page,
      limit,
      count: widgetsTotalCount,
    });

    const submissions = await prisma.submission.findMany({
      where: submissionsWhereInput,
      skip,
      take,
      select: {
        id: true,
        email: true,
        widget: { select: { name: true, type: true } },
        createdAt: true,
      },
    });

    return {
      data: submissions,
      meta,
    };
  } catch (error) {
    console.log("error", error);
    return {
      message: "Something went wrong when try to get current user profile",
    };
  }
};
