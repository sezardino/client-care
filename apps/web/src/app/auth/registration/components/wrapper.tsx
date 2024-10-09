"use client";

import { RegistrationForm } from "@/components/form/registration";

import { Typography } from "@/components/ui/typography";

import { ProjectUrls } from "@/const/url";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Link,
} from "@nextui-org/react";
import { ArrowLeft, Loader2 } from "lucide-react";
import NextLink from "next/link";
import { useRegistration } from "../use-registration";

const REGISTRATION_FORM_ID = "registration-form-id";

export const RegistrationPageWrapper = () => {
  const { errors, registration, isLoading } = useRegistration();

  return (
    <Card className="md:w-96">
      <CardHeader className="gap-2 flex-col items-start">
        <Typography level="h1" styling="h3">
          Create new account
        </Typography>

        <Link
          as={NextLink}
          href={ProjectUrls.home}
          className="-order-1 !justify-start gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
      </CardHeader>
      <CardBody className="mt-2">
        <RegistrationForm
          id={REGISTRATION_FORM_ID}
          onFormSubmit={registration}
          errors={errors}
        />
      </CardBody>

      <CardFooter className="grid grid-cols-1 gap-3 items-start">
        <Button
          form={REGISTRATION_FORM_ID}
          disabled={isLoading}
          color="primary"
          type="submit"
          className="w-full"
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Register
        </Button>

        <Typography level="p" styling="small">
          Already have an acccount?{" "}
          <Link as={NextLink} href={ProjectUrls.login}>
            Login
          </Link>
        </Typography>
      </CardFooter>
    </Card>
  );
};
