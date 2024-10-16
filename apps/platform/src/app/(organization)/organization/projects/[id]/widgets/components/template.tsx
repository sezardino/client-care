"use client";

import { ProjectWidgetsTable } from "@/components/modules/projects/project-widgets-table";
import { AlertModal } from "@/components/ui/alert-modal";
import { DEFAULT_ITEMS_PER_PAGE } from "@/const/base";
import { useGenerateSearchParamsUrl } from "@/hooks/use-generate-search-params-url";
import { useProjectSubPagesStore } from "@/store/project-sub-pages";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { useDeleteWidgetMutation } from "../hooks/delete-widget";
import { useProjectWidgetsQuery } from "../hooks/project-widgets";

type ActionType = "active" | "code" | "delete" | "duplicate";
type Action = { type: ActionType; id: string };

export const ProjectWidgetsTemplate = () => {
  const projectId = useProjectSubPagesStore((store) => store.projectId);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [action, setAction] = useState<Action | null>(null);

  const limit = Number(searchParams.get("limit")) || DEFAULT_ITEMS_PER_PAGE;
  const page = Number(searchParams.get("page")) || 1;

  const generatePathname = useGenerateSearchParamsUrl();

  const { data: projectWidgetsResponse, isPending: isDeleting } =
    useProjectWidgetsQuery({
      id: projectId!,
      limit,
      page,
    });

  const { mutateAsync: deleteWidget } = useDeleteWidgetMutation();

  const onChangePage = useCallback(
    (page: number) => router.push(generatePathname("page", page)),
    [generatePathname, router]
  );
  const onChangeLimit = useCallback(
    (limit: number) => router.push(generatePathname("limit", limit)),
    [generatePathname, router]
  );

  const deleteWidgetHandler = useCallback(async () => {
    if (!action) return;
    console.log(action);

    try {
      await deleteWidget(action.id);
      setAction(null);
    } catch (error) {
      console.log(error);
    }
  }, [action, deleteWidget]);

  return (
    <>
      <ProjectWidgetsTable
        widgets={projectWidgetsResponse?.data || []}
        onChangeActiveStateRequest={(id) => setAction({ type: "active", id })}
        onCodeRequest={(id) => setAction({ type: "code", id })}
        onDeleteRequest={(id) => setAction({ type: "delete", id })}
        onDuplicateRequest={(id) => setAction({ type: "duplicate", id })}
        currentLimit={limit}
        currentPage={page}
        totalPages={projectWidgetsResponse?.meta.totalPages || 0}
        onPageChange={onChangePage}
        onLimitChange={onChangeLimit}
      />

      <AlertModal
        isOpen={action?.type === "delete"}
        isActionPending={isDeleting}
        isClosePrevented={isDeleting}
        title="Are you sure you want to delete this widget?"
        description="Deleting this widget will remove it permanently, and you will no longer be able to collect submissions or view any associated data. This action cannot be undone. Are you sure you want to proceed?"
        confirm="Delete Widget"
        cancel="Cancel"
        confirmColor="danger"
        onConfirm={deleteWidgetHandler}
        onClose={() => setAction(null)}
      />
    </>
  );
};
