import { ProjectLayout } from "@/components/layout/project";
import { getQueryClientForHydration } from "@/libs/react-query";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { PropsWithChildren } from "react";
import { getProjectQuery } from "./hooks/project";

type Props = PropsWithChildren & {
  params: { id: string };
};

const Layout = async (props: Props) => {
  const { params, children } = props;

  const queryClient = getQueryClientForHydration();
  const project = await queryClient.fetchQuery(getProjectQuery(params.id));
  const dehydratedState = dehydrate(queryClient);

  if ("message" in project) return notFound();

  return (
    <HydrationBoundary state={dehydratedState}>
      <ProjectLayout projectId={params.id}>{children}</ProjectLayout>
    </HydrationBoundary>
  );
};

export default Layout;
