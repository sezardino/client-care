"use server";

import { prisma } from "@/libs/prisma";
import { ServerActionResponse } from "@/types/base";
import { auth } from "@clerk/nextjs/server";
import { Project } from "@prisma/client";

type ReturnType = {
  projects: (Pick<Project, "id" | "name" | "url" | "description"> & {
    logoUrl?: string;
  })[];
};

export const getOrganizationProjects = async (): Promise<
  ServerActionResponse<ReturnType>
> => {
  const { userId } = auth();

  if (!userId) return { message: "User not found" };

  try {
    const projects = await prisma.project.findMany({
      where: {
        deletedAt: null,
        organization: { members: { some: { id: userId } } },
      },
      select: {
        id: true,
        name: true,
        description: true,
        url: true,
        logo: { select: { publicPath: true } },
      },
    });

    return {
      projects: projects.map(({ logo, ...p }) => ({
        ...p,
        logoUrl: logo?.publicPath,
      })),
    };
  } catch (error) {
    console.log("error", error);
    return { message: "There was error when try to get current user data" };
  }
};
