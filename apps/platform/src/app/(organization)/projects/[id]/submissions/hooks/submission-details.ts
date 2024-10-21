import { getSubmissionDetails } from "@/actions/submissions/submission";
import { useServerQuery } from "@/libs/react-query/helpers";

export const SUBMISSION_DETAILS_QUERY_KEY = "submission-details-query-key";

export const getSubmissionDetailsQuery = (id: string) => ({
  queryKey: [SUBMISSION_DETAILS_QUERY_KEY, id],
  queryFn: async () => getSubmissionDetails(id),
  enabled: !!id,
});

export const useSubmissionDetailsQuery = (id: string) =>
  useServerQuery(getSubmissionDetailsQuery(id));
