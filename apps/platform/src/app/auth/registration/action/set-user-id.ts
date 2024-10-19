"use server";

import { ProjectUrls } from "@/const/url";
import { prisma, PRISMA_ERRORS } from "@/libs/prisma";
import { ServerActionResponse, SuccessResponse } from "@/types/base";
import { zodValidateAndFormatErrors } from "@/utils/zod";
import { auth } from "@clerk/nextjs/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { redirect } from "next/navigation";
import { z } from "zod";

const ValidationSchema = z.object({
  email: z.string().email(),
  id: z.string(),
});

export const setUserId = async (
  argument: unknown
): Promise<ServerActionResponse<SuccessResponse>> => {
  const { userId } = auth();

  if (userId) redirect(ProjectUrls.dashboard);
  const validationResponse = zodValidateAndFormatErrors(
    ValidationSchema,
    argument
  );

  if (!validationResponse.success)
    return { message: "Invalid input", errors: validationResponse.errors };

  const { email, id } = validationResponse.data;

  try {
    await prisma.user.update({
      where: { email },
      data: { id },
      select: { id: true },
    });

    return { success: true };
  } catch (error) {
    console.log(error);
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === PRISMA_ERRORS.RECORD_NOT_FOUND
    )
      return { message: "User not found" };

    return { message: "There was error when try to set user id" };
  }
};
