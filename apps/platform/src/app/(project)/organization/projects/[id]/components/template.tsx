"use client";

import { Typography } from "@/components/ui/typography";
import { Avatar } from "@nextui-org/react";
import { Folder } from "lucide-react";
import { useProjectQuery } from "../hooks/project";

type Props = {
  id: string;
};

export const ProjectTemplate = (props: Props) => {
  const { id } = props;

  const { data: projectData } = useProjectQuery(id);

  return (
    <>
      <header className="flex gap-2 items-center">
        <div className="flex flex-col gap-1">
          <Typography level="h1" styling="h2">
            {projectData?.name}
          </Typography>
          <Typography styling="small">
            Here you can found all data based to this project
          </Typography>
        </div>
        <Avatar
          src={projectData?.logoUrl || undefined}
          fallback={<Folder />}
          size="lg"
          className="-order-1"
        />
      </header>
    </>
  );
};
