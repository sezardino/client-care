type Props = { params: { id: string } };

const Page = (props: Props) => {
  return <main>{props.params.id}</main>;
};

export default Page;
