"use client";

import { NewOrganizationForm } from "@/components/form/new-organization";

import { Typography } from "@/components/ui/typography";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { Loader2 } from "lucide-react";
import { useCreateOrganizationMutation } from "../hooks/create-organization";

const NEW_ORGANIZATION_FORM_ID = "login-form";

export const NewOrganizationTemplate = () => {
  const { mutateAsync: createOrganization, isPending: isCreatingOrganization } =
    useCreateOrganizationMutation();

  return (
    <Card className="md:w-96 py-5 px-5">
      <CardHeader className="block">
        <Typography level="h1" styling="h3" className="text-center">
          Create new organization
        </Typography>
      </CardHeader>
      <CardBody>
        <NewOrganizationForm
          id={NEW_ORGANIZATION_FORM_ID}
          onFormSubmit={createOrganization}
        />
      </CardBody>

      <CardFooter className="grid grid-cols-1 gap-3 items-start">
        <Button
          form={NEW_ORGANIZATION_FORM_ID}
          type="submit"
          color="primary"
          disabled={isCreatingOrganization}
          className="w-full"
        >
          {isCreatingOrganization && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Create organization
        </Button>
      </CardFooter>
    </Card>
  );
};
