"use client";

import { useProjectQuery } from "@/app/(organization)/organization/projects/[id]/hooks/project";
import { Avatar, Button, Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import { AppWindowMac, Folder, Plus } from "lucide-react";
import { PropsWithChildren } from "react";
import { Typography } from "../ui/typography";

import { ProjectUrls } from "@/const/url";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

type Props = PropsWithChildren & {
  projectId: string;
};

export const ProjectLayout = (props: Props) => {
  const { projectId, children } = props;
  const pathname = usePathname();

  const { data: projectData } = useProjectQuery(projectId);

  if (!projectData) return null;

  const links = [
    { href: ProjectUrls.project(projectId), title: "General" },
    { href: ProjectUrls.projectSubmissions(projectId), title: "Submissions" },
    { href: ProjectUrls.projectTasks(projectId), title: "Tasks" },
    { href: ProjectUrls.projectWidgets(projectId), title: "Widgets" },
    { href: ProjectUrls.projectSettings(projectId), title: "Settings" },
  ];

  return (
    <>
      <header className="flex flex-col gap-4 pb-4">
        <div className="flex gap-2 items-center">
          <div className="flex flex-col gap-1">
            <Typography level="h1" styling="h2">
              {projectData.name}
            </Typography>
            <Typography styling="small">
              Here you can found all data based to this project
            </Typography>
          </div>
          <Avatar
            src={projectData.logoUrl || undefined}
            fallback={<Folder />}
            size="lg"
            className="-order-1"
          />
        </div>

        <Tabs
          variant="underlined"
          selectedKey={pathname}
          isDisabled={projectData.widgetsCount === 0}
          aria-label="Navigation on project"
        >
          {links.map((link) => (
            <Tab
              key={link.href}
              as={NextLink}
              href={link.href}
              title={link.title}
            />
          ))}
        </Tabs>
      </header>

      {projectData.widgetsCount > 0 && children}

      {projectData.widgetsCount === 0 && (
        <>
          <Card className="min-h-[560px]">
            <CardBody className="text-center flex items-center justify-center gap-8">
              <AppWindowMac className="w-20 h-20 text-default-400" />

              <div className="flex flex-col gap-2">
                <Typography level="h2" styling="h4" weight="medium">
                  No widgets created yet
                </Typography>
                <Typography
                  styling="small"
                  className="max-w-[560px] mx-auto text-default-500"
                >
                  It looks like you haven&apos;t created any widgets for this
                  project. Widgets allow you to collect valuable feedback,
                  reports, or other forms of input from your users.
                </Typography>
              </div>
              <div className="flex flex-col gap-4">
                <Typography level="h3" styling="small" weight="medium">
                  Click the button below to set up a new widget tailored to your
                  project’s needs.
                </Typography>
                <Button color="primary" className="self-center">
                  <Plus className="w-5 h-5" />
                  Add Your First Widget
                </Button>
              </div>
            </CardBody>
          </Card>
        </>
      )}
    </>
  );
};
