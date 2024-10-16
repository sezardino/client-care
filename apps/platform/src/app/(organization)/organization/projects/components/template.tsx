"use client";

import { NewProjectForm } from "@/components/form/new-project";
import { ProjectCard } from "@/components/modules/projects/project-card";
import { ModalWithForm } from "@/components/ui/modal-with-form";
import { Typography } from "@/components/ui/typography";
import { MAX_ORGANIZATION_PROJECTS_COUNT } from "@/const/limits";
import { NewProjectDto } from "@/dto/project";
import { Card, CardBody, Tooltip } from "@nextui-org/react";
import { PlusCircle } from "lucide-react";
import { useCallback, useState } from "react";
import { useCreateNewProjectMutation } from "../hooks/create-new-project";
import { useOrganizationProjectsQuery } from "../hooks/projects";

const FORM_ID = "create-project-form-id";

export const OrganizationProjectsTemplate = () => {
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);

  const { data: projectsResponse, isLoading: isProjectsLoading } =
    useOrganizationProjectsQuery();
  const { mutateAsync: createNewProject } = useCreateNewProjectMutation();

  const canCreateMoreProjects =
    !isProjectsLoading &&
    (projectsResponse?.projects.length || MAX_ORGANIZATION_PROJECTS_COUNT) <
      MAX_ORGANIZATION_PROJECTS_COUNT;

  const createNewProjectHandler = useCallback(
    async (values: NewProjectDto) => {
      try {
        await createNewProject(values);
        setIsNewProjectModalOpen(false);
      } catch (error) {
        console.log(error);
      }
    },
    [createNewProject]
  );

  return (
    <>
      <header className="flex items-center gap-3 flex-wrap justify-between">
        <div className="flex flex-col gap-1">
          <Typography level="h1" weight="medium" styling="h2">
            Your projects
          </Typography>
          <Typography styling="small">
            Here you can manage your projects
          </Typography>
        </div>
      </header>

      <section className="mt-8">
        <ul className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {projectsResponse?.projects.map((project) => (
            <li key={project.id}>
              <ProjectCard
                id={project.id}
                name={project.name}
                url={project.url}
                logoUrl={project.logoUrl}
                description={project.description}
              />
            </li>
          ))}

          <Tooltip
            isDisabled={!canCreateMoreProjects}
            content={`You can create only ${MAX_ORGANIZATION_PROJECTS_COUNT} projects.`}
          >
            <Card
              as="button"
              isBlurred
              isHoverable
              isPressable
              isDisabled={!canCreateMoreProjects}
              disabled={!canCreateMoreProjects}
              className="border-none bg-background/60 dark:bg-default-100/50 w-full h-full min-h-40"
              shadow="sm"
              onClick={() => setIsNewProjectModalOpen(true)}
            >
              <CardBody className="text-center flex-row gap-2 justify-center items-center">
                <PlusCircle className="w-5 h-5" />
                <Typography styling="large" weight="medium">
                  Create new Project
                </Typography>
              </CardBody>
            </Card>
          </Tooltip>
        </ul>
      </section>

      <ModalWithForm
        title="Create New Project"
        description="Set up a new project by providing the necessary details. Once created, you can start adding widgets to your project."
        confirm="Create Project"
        cancel="Cancel"
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
        formId={FORM_ID}
      >
        <NewProjectForm id={FORM_ID} onFormSubmit={createNewProjectHandler} />
      </ModalWithForm>
    </>
  );
};
