"use client";

import { ProjectSubmissionsTable } from "@/components/modules/submissions/project-submissions-table";
import { SubmissionStatusSelect } from "@/components/ui/submission-status-select";
import { useTableSearchParams } from "@/hooks/table-search-params";
import { useProjectSubPagesStore } from "@/store/project-sub-pages";
import { isSubmissionStatus } from "@/utils/is-submission-status";
import { SubmissionStatus } from "@prisma/client";
import { useState } from "react";
import { SUBMISSION_STATUS_FILTER_PARAM_NAME } from "../const";
import { useProjectSubmissionsQuery } from "../hooks/project-submissions";
import { SubmissionPreview } from "./submission-preview";

export const ProjectSubmissionsTemplate = () => {
  const projectId = useProjectSubPagesStore((store) => store.projectId);
  const { limit, page, changeParamHandler, getParam } = useTableSearchParams();
  const { data: status } = isSubmissionStatus.safeParse(
    getParam(SUBMISSION_STATUS_FILTER_PARAM_NAME)
  );

  const [selectedSubmissionId, setSelectedSubmissionId] = useState<
    string | null
  >(null);

  const { data: submissionsResponse, isLoading: isSubmissionsLoading } =
    useProjectSubmissionsQuery({
      projectId: projectId!,
      limit,
      page,
      status,
    });

  return (
    <>
      <section className="flex flex-col gap-4">
        <header className="flex items-center justify-between">
          <SubmissionStatusSelect
            variant="bordered"
            placeholder="Choose a status"
            disallowEmptySelection
            defaultSelectedKeys={status ? [status] : undefined}
            className="ml-auto max-w-40"
            onSelectionChange={(keys) =>
              changeParamHandler(
                "status",
                Array.from(keys)[0] as SubmissionStatus
              )
            }
          />
        </header>
        <ProjectSubmissionsTable
          submissions={submissionsResponse?.data || []}
          currentLimit={limit}
          isLoading={isSubmissionsLoading}
          currentPage={page}
          totalPages={submissionsResponse?.meta.totalPages || 0}
          onPageChange={(page) => changeParamHandler("page", page)}
          onLimitChange={(limit) => changeParamHandler("limit", limit)}
          emptyContent={
            status ? "There are no submissions with selected status" : undefined
          }
          onSelectSubmission={setSelectedSubmissionId}
        />
      </section>

      <SubmissionPreview
        isOpen={!!selectedSubmissionId}
        onClose={() => setSelectedSubmissionId(null)}
        submissionId={selectedSubmissionId!}
      />
    </>
  );
};
