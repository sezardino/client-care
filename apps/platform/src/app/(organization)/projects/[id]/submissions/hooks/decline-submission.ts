import { declineSubmission } from "@/actions/submissions/decline-submission";
import { useServerMutation } from "@/libs/react-query/helpers";
import { toast } from "sonner";
import { PROJECT_SUBMISSIONS_QUERY_KEY } from "./project-submissions";
import { SUBMISSION_DETAILS_QUERY_KEY } from "./submission-details";

export const useDeclineSubmissionMutation = () =>
  useServerMutation({
    mutationFn: async (id: string) => declineSubmission(id),
    onSuccess: () => toast.success("Submission successfully declined"),
    getQueriesToInvalidate: (_, submissionId) => [
      [PROJECT_SUBMISSIONS_QUERY_KEY],
      [SUBMISSION_DETAILS_QUERY_KEY, submissionId],
    ],
  });
