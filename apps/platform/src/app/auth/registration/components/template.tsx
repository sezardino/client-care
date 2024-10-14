"use client";

import { RegistrationForm } from "@/components/form/registration";
import { VerificationForm } from "@/components/form/verification";
import { Typography } from "@/components/ui/typography";
import { ProjectUrls } from "@/const/url";
import { RegistrationDto } from "@/dto/auth";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  cn,
  Link,
} from "@nextui-org/react";
import { ArrowLeft, Loader2 } from "lucide-react";
import NextLink from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { useRegistrationMutation } from "../hooks/registration";
import { useRegistrationVerificationMutation } from "../hooks/registration-verification";

type Props = {
  inviteId?: string;
  inviteValidationError?: string;
};

const FORM_ID = "registration-form-id";

export const RegistrationTemplate = (props: Props) => {
  const { inviteValidationError, inviteId } = props;
  const [step, setStep] = useState<"idle" | "verification">("idle");

  const {
    mutateAsync: registration,
    error: registrationErrors,
    isPending: isRegistrationPending,
  } = useRegistrationMutation();
  const {
    mutateAsync: registrationVerification,
    error: registrationVerificationErrors,
    isPending: isRegistrationVerificationPending,
  } = useRegistrationVerificationMutation({
    inviteId,
  });

  const registrationHandler = async (values: RegistrationDto) => {
    if (inviteValidationError) return toast.error(inviteValidationError);

    try {
      await registration(values);
      setStep("verification");
    } catch (error) {
      console.log(error);
    }
  };

  const isLoading = isRegistrationPending || isRegistrationVerificationPending;

  return (
    <Card className="md:w-96 py-5">
      <CardHeader className="gap-2 flex-col items-start">
        <Typography
          level="h1"
          styling="h3"
          className={cn(
            (inviteValidationError || step === "verification") && "sr-only"
          )}
        >
          Create new account
        </Typography>

        {step === "verification" && (
          <div className="flex flex-col">
            <Typography level="h2" styling="h3">
              Verification Code
            </Typography>
            <Typography level="p" styling="small">
              Check your email, for verification code
            </Typography>
          </div>
        )}

        {inviteValidationError && (
          <div className="flex flex-col gap-5 mt-5">
            <Typography level="h2" styling="h3" className="text-center">
              Something went wrong when try to validate inviting
            </Typography>
            <Typography
              level="p"
              styling="small"
              className="text-red-400 text-center"
            >
              {inviteValidationError}
            </Typography>
          </div>
        )}

        <Link
          as={NextLink}
          size="sm"
          href={ProjectUrls.home}
          className="-order-1 !justify-start gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </CardHeader>

      {!inviteValidationError && (
        <>
          <CardBody className="mt-2">
            {step === "idle" && (
              <RegistrationForm
                id={FORM_ID}
                onFormSubmit={registrationHandler}
                errors={
                  registrationErrors && "errors" in registrationErrors
                    ? registrationErrors.errors
                    : undefined
                }
              />
            )}

            {step === "verification" && (
              <VerificationForm
                id={FORM_ID}
                onFormSubmit={registrationVerification}
                errors={
                  registrationVerificationErrors &&
                  "errors" in registrationVerificationErrors
                    ? registrationVerificationErrors.errors
                    : undefined
                }
              />
            )}
          </CardBody>

          <CardFooter className="grid grid-cols-1 gap-3 items-start">
            <Button
              form={FORM_ID}
              type="submit"
              color="primary"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {step === "idle" ? "Register" : "Verify"}
            </Button>

            {step === "idle" && (
              <Typography level="p" styling="small" className="text-center">
                Already have an account?{" "}
                <Link as={NextLink} size="sm" href={ProjectUrls.login}>
                  Login
                </Link>
              </Typography>
            )}
          </CardFooter>
        </>
      )}
    </Card>
  );
};
