"use server";

import { DtoWithIdSchema } from "@/dto/common";
import { prisma } from "@/libs/prisma";
import { ServerActionResponse } from "@/types/base";
import { SubmissionDetails } from "@/types/entities";
import { zodValidateAndFormatErrors } from "@/utils/zod";
import { auth } from "@clerk/nextjs/server";

export const getSubmissionDetails = async (
  argument: unknown
): Promise<ServerActionResponse<SubmissionDetails>> => {
  const { userId } = auth();

  if (!userId) return { message: "Unauthorized" };

  const validationResponse = zodValidateAndFormatErrors(DtoWithIdSchema, {
    id: argument,
  });

  if (!validationResponse.success)
    return { message: "Invalid input", errors: validationResponse.errors };

  const { id } = validationResponse.data;

  try {
    const submission = await prisma.submission.findUnique({
      where: { id, organization: { members: { some: { id: userId } } } },
      select: {
        id: true,
        email: true,
        fullName: true,
        phone: true,
        status: true,
        createdAt: true,
        feedback: { select: { message: true, rating: true } },
        report: {
          select: {
            message: true,
            files: { select: { publicPath: true, createdAt: true } },
          },
        },
        survey: { select: { options: true, satisfaction: true } },
        contact: { select: { message: true, subject: true } },

        widget: {
          select: { name: true, type: true, isActive: true },
        },
      },
    });

    if (!submission) return { message: "Submission not found" };

    return submission;
  } catch (error) {
    console.log("error", error);

    return {
      message: "Something went wrong when try to get current user profile",
    };
  }
};
