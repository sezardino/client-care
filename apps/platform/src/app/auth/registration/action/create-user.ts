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
});

export const createUser = async (
  argument: unknown
): Promise<ServerActionResponse<SuccessResponse>> => {
  const { userId } = auth();

  if (userId) redirect(ProjectUrls.dashboard);
  const validationResponse = zodValidateAndFormatErrors(ValidationSchema, {
    email: argument,
  });

  if (!validationResponse.success)
    return { message: "Invalid input", errors: validationResponse.errors };

  const { email } = validationResponse.data;

  try {
    await prisma.user.create({
      data: { email },
      select: { id: true },
    });

    return { success: true };
  } catch (error) {
    console.log(error);
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === PRISMA_ERRORS.UNIQUE_CONSTRAINT_FAILED
    )
      return { message: "Email already in use" };

    return { message: "There was error when try to create user" };
  }
};
