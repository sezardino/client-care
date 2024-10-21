/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import {
  SubmissionPreviewModal,
  SubmissionPreviewModalProps,
} from "@/components/modules/submissions/submission-preview-modal";
import { AlertModal } from "@/components/ui/alert-modal";
import { SubmissionStatusSelect } from "@/components/ui/submission-status-select";
import { ModalBody } from "@nextui-org/react";
import { SubmissionStatus } from "@prisma/client";
import { useCallback, useState } from "react";
import { useCancelDeclineSubmissionMutation } from "../hooks/cancel-decline-submission";
import { useDeclineSubmissionMutation } from "../hooks/decline-submission";
import { useSubmissionDetailsQuery } from "../hooks/submission-details";

type Props = Omit<
  SubmissionPreviewModalProps,
  | "onDeclineRequest"
  | "onReDeclineRequest"
  | "onProcessRequest"
  | "submission"
  | "isSubmissionLoading"
  | "isActionPending"
> & { submissionId: string };

type SubmissionAction = "decline" | "cancel-decline";
const acceptedAfterDeclineStatuses = [
  SubmissionStatus.NEW,
  SubmissionStatus.PROCESSED,
];
type AcceptedAfterDeclineStatuses =
  (typeof acceptedAfterDeclineStatuses)[number];

export const SubmissionPreview = (props: Props) => {
  const { submissionId, ...rest } = props;
  const [cancelDeclineStatus, setCancelDeclineStatus] =
    useState<AcceptedAfterDeclineStatuses>(SubmissionStatus.NEW);
  const [action, setAction] = useState<SubmissionAction | null>(null);

  const { data: details, isFetching: isDetailsLoading } =
    useSubmissionDetailsQuery(submissionId);

  const { mutateAsync: declineHandler, isPending: isDeclinePending } =
    useDeclineSubmissionMutation();
  const {
    mutateAsync: cancelDeclineHandler,
    isPending: isCancelDeclinePending,
  } = useCancelDeclineSubmissionMutation();

  const alertHandler = useCallback(async () => {
    if (!action || !submissionId) return;
    if (action === "cancel-decline" && !cancelDeclineStatus) return;

    try {
      if (action === "decline") await declineHandler(submissionId);
      if (action === "cancel-decline")
        await cancelDeclineHandler({
          id: submissionId,
          status: cancelDeclineStatus,
        });

      setAction(null);
      setCancelDeclineStatus(SubmissionStatus.NEW);
    } catch (error) {
      console.log(error);
    }
  }, [
    action,
    cancelDeclineHandler,
    cancelDeclineStatus,
    declineHandler,
    submissionId,
  ]);

  return (
    <>
      <SubmissionPreviewModal
        {...rest}
        submission={details}
        isSubmissionLoading={isDetailsLoading}
        isActionPending={isDeclinePending || isCancelDeclinePending}
        isClosePrevented={!!action || isDetailsLoading}
        onDeclineRequest={() => setAction("decline")}
        onReDeclineRequest={() => setAction("cancel-decline")}
        onProcessRequest={() => {}}
      />

      <AlertModal
        title="Confirm the Decline"
        description="Are you sure you want to decline this submission? Please note that declined submissions will be permanently deleted after 7 days."
        cancel="Cancel"
        confirm="Decline Submission"
        confirmColor="danger"
        isOpen={action === "decline"}
        isActionPending={isDeclinePending}
        onClose={() => setAction(null)}
        onConfirm={alertHandler}
      />

      <AlertModal
        title="Confirm Cancel Decline"
        description="Are you sure you want to cancel the decline of this submission? The submission will be restored and will no longer be marked as declined."
        cancel="Cancel"
        confirm="Cancel Decline"
        isOpen={action === "cancel-decline"}
        isActionPending={isCancelDeclinePending}
        onClose={() => setAction(null)}
        onConfirm={alertHandler}
      >
        <ModalBody>
          <SubmissionStatusSelect
            label="Select New Status"
            variant="bordered"
            placeholder="Choose a status"
            disallowEmptySelection
            description="Please select the status you want to assign to this submission after canceling the decline."
            defaultSelectedKeys={[SubmissionStatus.NEW]}
            excludedStatuses={[SubmissionStatus.DECLINED]}
            onSelectionChange={(keys) =>
              setCancelDeclineStatus(keys[0] as AcceptedAfterDeclineStatuses)
            }
          />
        </ModalBody>
      </AlertModal>
    </>
  );
};
