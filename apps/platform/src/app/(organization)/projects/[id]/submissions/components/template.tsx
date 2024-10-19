"use client";

import { ProjectSubmissionsTable } from "@/components/modules/submissions/project-submissions-table";
import { useTableSearchParams } from "@/hooks/table-search-params";
import { useProjectSubPagesStore } from "@/store/project-sub-pages";
import { useState } from "react";
import { useProjectSubmissionsQuery } from "../hooks/project-submissions";
import { SubmissionPreview } from "./submission-preview";

export const ProjectSubmissionsTemplate = () => {
  const projectId = useProjectSubPagesStore((store) => store.projectId);
  const { limit, page, changeLimitHandler, changePageHandler } =
    useTableSearchParams();

  const [selectedSubmissionId, setSelectedSubmissionId] = useState<
    string | null
  >(null);

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
        onSelectSubmission={setSelectedSubmissionId}
      />

      <SubmissionPreview
        isOpen={!!selectedSubmissionId}
        onClose={() => setSelectedSubmissionId(null)}
        submissionId={selectedSubmissionId!}
      />
    </>
  );
};
