import { ProjectTemplate } from "./components/template";

type Props = { params: { id: string } };

const Page = (props: Props) => {
  return (
    <main>
      <ProjectTemplate id={props.params.id} />
    </main>
  );
};

export default Page;
