import { getQueryClientForHydration } from "@/libs/react-query";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ProjectTemplate } from "./components/template";
import { getProjectQuery } from "./hooks/project";

type Props = { params: { id: string } };

const Page = async (props: Props) => {
  const queryClient = getQueryClientForHydration();
  const project = await queryClient.fetchQuery(
    getProjectQuery(props.params.id)
  );
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary
      state={"message" in project ? undefined : dehydratedState}
    >
      <main>
        <ProjectTemplate id={props.params.id} />
      </main>
    </HydrationBoundary>
  );
};

export default Page;
