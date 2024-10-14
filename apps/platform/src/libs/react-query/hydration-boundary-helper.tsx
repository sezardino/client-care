import { getQueryClientForHydration } from "@/libs/react-query";
import "@/styles/index.css";
import { dehydrate, HydrationBoundary, Query } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren & {
  queries: Query[];
};

export const HydrationBoundaryHelper = async (props: Props) => {
  const { queries, children } = props;

  const queryClient = getQueryClientForHydration();

  await Promise.all(
    queries.map(async (query) => await queryClient.prefetchQuery(query))
  );

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
  );
};
