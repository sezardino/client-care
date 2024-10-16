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
  widgets: {
    total: number;
    test: number;
    notTest: number;
    active: number;
    notActive: number;
  };
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
    const projectWhere = {
      id,
      organization: { members: { some: { id: userId } } },
    };

    const project = await prisma.project.findUnique({
      where: projectWhere,
      select: {
        id: true,
        name: true,
        logo: { select: { publicPath: true } },
        _count: { select: { widgets: { where: { deletedAt: null } } } },
      },
    });

    if (!project) return { message: "Project not found" };

    const testWidgetsCount = await prisma.widget.count({
      where: { projectId: project.id, deletedAt: null, isTest: true },
    });
    const activeWidgetsCount = await prisma.widget.count({
      where: { projectId: project.id, deletedAt: null, isActive: true },
    });

    const { logo, _count, ...rest } = project;

    return {
      ...rest,
      logoUrl: logo?.publicPath || null,
      widgets: {
        total: _count.widgets,
        test: testWidgetsCount,
        notTest: _count.widgets - testWidgetsCount,
        active: activeWidgetsCount,
        notActive: _count.widgets - activeWidgetsCount,
      },
    };
  } catch (error) {
    console.log("error", error);
    return {
      message: "Something went wrong when try to get current user profile",
    };
  }
};
