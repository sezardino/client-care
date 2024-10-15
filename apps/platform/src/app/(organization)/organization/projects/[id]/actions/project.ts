"use server";

import { prisma } from "@/libs/prisma";
import { ServerActionResponse } from "@/types/base";
import { zodValidateAndFormatErrors } from "@/utils/zod";
import { auth } from "@clerk/nextjs/server";
import { Project } from "@prisma/client";
import { z } from "zod";

const ValidationSchema = z.object({
  id: z.string(),
});

type ReturnType = Pick<Project, "id" | "name"> & {
  logoUrl: string | null;
  widgetsCount: number;
};

export const getProjectData = async (
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
    const project = await prisma.project.findUnique({
      where: { id, organization: { members: { some: { id: userId } } } },
      select: {
        id: true,
        name: true,
        logo: { select: { publicPath: true } },
        _count: { select: { widgets: true } },
      },
    });

    if (!project) return { message: "Project not found" };

    const { logo, _count, ...rest } = project;

    return {
      ...rest,
      logoUrl: logo?.publicPath || null,
      widgetsCount: _count.widgets,
    };
  } catch (error) {
    console.log("error", error);
    return {
      message: "Something went wrong when try to get current user profile",
    };
  }
};
