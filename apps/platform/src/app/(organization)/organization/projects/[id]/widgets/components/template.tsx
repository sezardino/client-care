"use client";

import { ProjectWidgetsTable } from "@/components/modules/projects/project-widgets-table";
import { DEFAULT_ITEMS_PER_PAGE } from "@/const/base";
import { useGenerateSearchParamsUrl } from "@/hooks/use-generate-search-params-url";
import { useProjectSubPagesStore } from "@/store/project-sub-pages";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { useProjectWidgetsQuery } from "../hooks/project-widgets";

export const ProjectWidgetsTemplate = () => {
  const projectId = useProjectSubPagesStore((store) => store.projectId);
  const searchParams = useSearchParams();
  const router = useRouter();

  const limit = Number(searchParams.get("limit")) || DEFAULT_ITEMS_PER_PAGE;
  const page = Number(searchParams.get("page")) || 1;

  const generatePathname = useGenerateSearchParamsUrl();

  const { data: projectWidgetsResponse } = useProjectWidgetsQuery({
    id: projectId!,
    limit,
    page,
  });

  const onChangePage = useCallback(
    (page: number) => router.push(generatePathname("page", page)),
    [router]
  );
  const onChangeLimit = useCallback(
    (limit: number) => router.push(generatePathname("limit", limit)),
    [router]
  );

  return (
    <>
      <ProjectWidgetsTable
        widgets={projectWidgetsResponse?.data || []}
        onChangeActiveStateRequest={() => console.log("active")}
        onCodeRequest={() => console.log("code")}
        onDeleteRequest={() => console.log("delete")}
        onDuplicateRequest={() => console.log("duplicate")}
        currentLimit={limit}
        currentPage={page}
        totalPages={projectWidgetsResponse?.meta.totalPages || 0}
        onPageChange={onChangePage}
        onLimitChange={onChangeLimit}
      />
    </>
  );
};
