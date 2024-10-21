import { cancelDeclineSubmission } from "@/actions/submissions/cancel-decline-submission";
import { CancelDeclineSubmissionDto } from "@/dto/submissions";
import { useServerMutation } from "@/libs/react-query/helpers";
import { toast } from "sonner";
import { PROJECT_SUBMISSIONS_QUERY_KEY } from "./project-submissions";
import { SUBMISSION_DETAILS_QUERY_KEY } from "./submission-details";

export const useCancelDeclineSubmissionMutation = () =>
  useServerMutation({
    mutationFn: async (dto: CancelDeclineSubmissionDto) =>
      cancelDeclineSubmission(dto),
    onSuccess: () =>
      toast.success("Successfully cancel decline for submission"),
    getQueriesToInvalidate: (_, v) => [
      [PROJECT_SUBMISSIONS_QUERY_KEY],
      [SUBMISSION_DETAILS_QUERY_KEY, v.id],
    ],
  });
