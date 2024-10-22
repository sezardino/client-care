"use client";

import { WidgetForm } from "@/components/form/widget";
import { WidgetStatusForm } from "@/components/form/widget-status";
import { ProjectWidgetsTable } from "@/components/modules/projects/project-widgets-table";
import { WidgetCodeSnippetModal } from "@/components/modules/projects/widget-code-snippet-modal";
import { AlertModal } from "@/components/ui/alert-modal";
import { ModalWithForm } from "@/components/ui/modal-with-form";
import { useTableSearchParams } from "@/hooks/table-search-params";
import { WidgetStatusDto } from "@/schemas/dto/widget";
import { WidgetFormValues } from "@/schemas/form/widget";
import { useProjectSubPagesStore } from "@/store/project-sub-pages";
import { WidgetTable } from "@/types/table";
import { useCallback, useMemo, useState } from "react";
import { useCreateWidgetMutation } from "../../hooks/create-widget";
import { useChangeWidgetStatusMutation } from "../hooks/change-widget-status";
import { useDeleteWidgetMutation } from "../hooks/delete-widget";
import { useProjectWidgetsQuery } from "../hooks/project-widgets";
import { useWidgetCodeSnippetQuery } from "../hooks/widget-code-snippet";

type ActionType = "active" | "code" | "delete" | "duplicate";
type Action = { type: ActionType; id: string };

const WIDGET_FORM_ID = "template-widget-form-id";
const WIDGET_STATUS_FORM_ID = "widget-status-form-id";

export const ProjectWidgetsTemplate = () => {
  const projectId = useProjectSubPagesStore((store) => store.projectId);
  const [action, setAction] = useState<Action | null>(null);
  const { limit, page, changeLimitHandler, changePageHandler } =
    useTableSearchParams();

  const { data: widgetsResponse, isLoading: isWidgetsLoading } =
    useProjectWidgetsQuery({
      projectId: projectId!,
      limit,
      page,
    });
  const { data: widgetCodeSnippet, isFetching: isSnippetFetching } =
    useWidgetCodeSnippetQuery(action?.type === "code" ? action.id : undefined!);

  const { mutateAsync: deleteWidget, isPending: isDeletingPending } =
    useDeleteWidgetMutation();
  const { mutateAsync: createWidget, isPending: isCreatingPending } =
    useCreateWidgetMutation();
  const {
    mutateAsync: changeWidgetStatus,
    isPending: isChangingWidgetStatusPending,
  } = useChangeWidgetStatusMutation();

  const deleteWidgetHandler = useCallback(async () => {
    if (!action) return;

    try {
      await deleteWidget(action.id);
      setAction(null);
    } catch (error) {
      console.log(error);
    }
  }, [action, deleteWidget]);

  const selectedWidget = useMemo<WidgetTable | undefined>(() => {
    if (!action) return;
    if (!["duplicate", "active"].includes(action.type)) return;

    const neededWidget = widgetsResponse?.data.find((w) => w.id === action?.id);

    return neededWidget;
  }, [action, widgetsResponse?.data]);

  const createWidgetHandler = useCallback(
    async (values: WidgetFormValues) => {
      if (!projectId) return;
      if (!action) return;
      if (action.type !== "duplicate") return;

      try {
        const { id } = await createWidget({ ...values, projectId });

        setAction({ type: "code", id });
      } catch (error) {
        console.log(error);
      }
    },
    [projectId, action, createWidget]
  );

  const changeWidgetStatusHandler = useCallback(
    async (values: WidgetStatusDto) => {
      if (!projectId || !action || action.type !== "active") return;
      if (!selectedWidget) return;
      if (selectedWidget.isActive === values.isActive) return setAction(null);

      try {
        await changeWidgetStatus({ ...values, widgetId: action.id });

        setAction(null);
      } catch (error) {
        console.log(error);
      }
    },
    [projectId, action, selectedWidget, changeWidgetStatus]
  );

  return (
    <>
      <ProjectWidgetsTable
        widgets={widgetsResponse?.data || []}
        onChangeActiveStateRequest={(id) => setAction({ type: "active", id })}
        onCodeRequest={(id) => setAction({ type: "code", id })}
        onDeleteRequest={(id) => setAction({ type: "delete", id })}
        onDuplicateRequest={(id) => setAction({ type: "duplicate", id })}
        currentLimit={limit}
        isLoading={isWidgetsLoading}
        currentPage={page}
        totalPages={widgetsResponse?.meta.totalPages || 0}
        onPageChange={changePageHandler}
        onLimitChange={changeLimitHandler}
      />

      <AlertModal
        isOpen={action?.type === "delete"}
        isActionPending={isDeletingPending}
        isClosePrevented={isDeletingPending}
        title="Are you sure you want to delete this widget?"
        description="Deleting this widget will remove it permanently, and you will no longer be able to collect submissions or view any associated data. This action cannot be undone. Are you sure you want to proceed?"
        confirm="Delete Widget"
        cancel="Cancel"
        confirmColor="danger"
        onConfirm={deleteWidgetHandler}
        onClose={() => setAction(null)}
      />

      <ModalWithForm
        title="Clone and Customize Widget"
        description="Create a customized clone of this widget by adjusting the necessary settings below. You can modify its name, type, and any specific configurations."
        cancel="Cancel"
        confirm="Clone and Create"
        isOpen={action?.type === "duplicate"}
        isActionPending={isCreatingPending}
        isClosePrevented={isCreatingPending}
        onClose={() => setAction(null)}
        formId={WIDGET_FORM_ID}
      >
        <WidgetForm
          id={WIDGET_FORM_ID}
          isCopy
          initialValues={selectedWidget}
          onFormSubmit={createWidgetHandler}
        />
      </ModalWithForm>

      <ModalWithForm
        title="Toggle Widget Status"
        description="Enable or disable this widget instantly. When disabled, it will stop functioning on your site until re-enabled."
        cancel="Cancel"
        confirm="Save Changes"
        isOpen={action?.type === "active"}
        isActionPending={isChangingWidgetStatusPending}
        isClosePrevented={isChangingWidgetStatusPending}
        onClose={() => setAction(null)}
        formId={WIDGET_STATUS_FORM_ID}
      >
        <WidgetStatusForm
          id={WIDGET_STATUS_FORM_ID}
          initialValues={selectedWidget}
          onFormSubmit={changeWidgetStatusHandler}
        />
      </ModalWithForm>

      <WidgetCodeSnippetModal
        title="Widget Integration Code"
        description="Copy the code snippet below and paste it into the HTML of your website where you want the widget to appear. This will enable the widget functionality for your site."
        isOpen={action?.type === "code"}
        isLoading={isSnippetFetching}
        snippet={widgetCodeSnippet?.snippet}
        onClose={() => setAction(null)}
      />
    </>
  );
};
