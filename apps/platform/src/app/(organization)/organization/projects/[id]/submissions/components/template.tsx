"use client";

import { ProjectSubmissionsTable } from "@/components/modules/projects/project-submissions-table";
import { useTableSearchParams } from "@/hooks/table-search-params";
import { useProjectSubPagesStore } from "@/store/project-sub-pages";
import { useProjectSubmissionsQuery } from "../hooks/project-submissions";

export const ProjectSubmissionsTemplate = () => {
  const projectId = useProjectSubPagesStore((store) => store.projectId);
  const { limit, page, changeLimitHandler, changePageHandler } =
    useTableSearchParams();

  const { data } = useProjectSubmissionsQuery({
    projectId: projectId!,
    limit,
    page,
  });

  return (
    <>
      <ProjectSubmissionsTable
        submissions={data?.data || []}
        currentLimit={limit}
        currentPage={page}
        totalPages={data?.meta.totalPages || 0}
        onPageChange={changePageHandler}
        onLimitChange={changeLimitHandler}
      />
    </>
  );
};
