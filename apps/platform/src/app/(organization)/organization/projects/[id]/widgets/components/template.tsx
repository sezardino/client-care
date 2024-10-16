"use client";

import { ProjectWidgetsTable } from "@/components/modules/projects/project-widgets-table";
import { useProjectSubPagesStore } from "@/store/project-sub-pages";
import { useProjectWidgetsQuery } from "../hooks/project-widgets";

export const ProjectWidgetsTemplate = () => {
  const projectId = useProjectSubPagesStore((store) => store.projectId);

  const { data: projectWidgetsResponse } = useProjectWidgetsQuery(projectId!);

  return (
    <>
      <ProjectWidgetsTable widgets={projectWidgetsResponse?.widgets || []} />
    </>
  );
};
