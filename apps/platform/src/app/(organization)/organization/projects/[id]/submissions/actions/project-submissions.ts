"use server";

import { ProjectSubmissionsDtoSchema } from "@/dto/submissions";
import { prisma } from "@/libs/prisma";
import { PaginationResponse, ServerActionResponse } from "@/types/base";
import { SubmissionTable } from "@/types/table";
import { getBackendPagination } from "@/utils/get-pagination";
import { zodValidateAndFormatErrors } from "@/utils/zod";
import { auth } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";

export const getProjectSubmissions = async (
  argument: unknown
): Promise<ServerActionResponse<PaginationResponse<SubmissionTable>>> => {
  const { userId } = auth();

  if (!userId) return { message: "Unauthorized" };

  const validationResponse = zodValidateAndFormatErrors(
    ProjectSubmissionsDtoSchema,
    argument
  );

  if (!validationResponse.success)
    return { message: "Invalid input", errors: validationResponse.errors };

  const { projectId, page, limit, status } = validationResponse.data;

  try {
    const submissionsWhereInput: Prisma.SubmissionWhereInput = {
      projectId,
      status,
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
        status: true,
        createdAt: true,
        widget: {
          select: { name: true, type: true, isTest: true, isActive: true },
        },
      },
    });

    return { data: submissions, meta };
  } catch (error) {
    console.log("error", error);
    return {
      message: "Something went wrong when try to get current user profile",
    };
  }
};