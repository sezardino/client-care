"use server";

import { prisma, PRISMA_ERRORS } from "@/libs/prisma";
import { CancelDeclineSubmissionDtoSchema } from "@/schemas/dto/submissions";
import { ServerActionResponse, SuccessResponse } from "@/types/base";
import { zodValidateAndFormatErrors } from "@/utils/zod";
import { auth } from "@clerk/nextjs/server";
import { SubmissionStatus } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const cancelDeclineSubmission = async (
  argument: unknown
): Promise<ServerActionResponse<SuccessResponse>> => {
  const { userId } = auth();

  if (!userId) return { message: "Unauthorized" };

  const validationResponse = zodValidateAndFormatErrors(
    CancelDeclineSubmissionDtoSchema,
    argument
  );

  if (!validationResponse.success)
    return { message: "Invalid input", errors: validationResponse.errors };

  const { id, status } = validationResponse.data;

  try {
    await prisma.submission.update({
      where: { id, status: SubmissionStatus.DECLINED },
      data: { status, declinedAt: null },
      select: { id: true },
    });

    return { success: true };
  } catch (error) {
    console.log("error: ", error);

    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === PRISMA_ERRORS.RECORD_NOT_FOUND
    )
      return { message: "Submission not found" };

    return {
      message: "Something went wrong when try to re-decline submission",
    };
  }
};
