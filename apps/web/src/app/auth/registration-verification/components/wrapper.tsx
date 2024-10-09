"use client";

import { VerificationForm } from "@/components/form/verification";

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
import { useRegistrationVerification } from "../use-registration-verification";

const VERIFICATION_FORM_ID = "vERIFICATION-form-id";

export const RegistrationVerificationPageWrapper = () => {
  const { errors, verify, isLoading } = useRegistrationVerification();

  return (
    <Card className="md:w-96">
      <CardHeader className="gap-4 flex-col items-start">
        <div className="flex flex-col">
          <Typography level="h1" styling="h3">
            Verification Code
          </Typography>
          <Typography level="p" styling="small">
            Check your email, for verification code
          </Typography>
        </div>
        <Link
          as={NextLink}
          href={ProjectUrls.registration}
          className="-order-1 !justify-start gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Registration
        </Link>
      </CardHeader>
      <CardBody>
        <VerificationForm
          id={VERIFICATION_FORM_ID}
          onFormSubmit={verify}
          errors={errors}
        />
      </CardBody>

      <CardFooter className="grid grid-cols-1 gap-3 items-start">
        <Button
          form={VERIFICATION_FORM_ID}
          type="submit"
          color="primary"
          disabled={isLoading}
          className="w-full"
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Verify my code
        </Button>
      </CardFooter>
    </Card>
  );
};
