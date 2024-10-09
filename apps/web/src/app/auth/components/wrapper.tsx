"use client";

import { LoginForm } from "@/components/form/login";

import { Typography } from "@/components/ui/typography";
import { ProjectUrls } from "@/const/url";
import { useAuth } from "@clerk/nextjs";
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
import { useRouter } from "next/navigation";
import { useLogin } from "../use-login";

const LOGIN_FORM_ID = "login-form";

export const LoginPageWrapper = () => {
  const { errors, login, isLoading } = useLogin();
  const router = useRouter();

  const { isSignedIn } = useAuth();

  // If the user is already signed in,
  // redirect them to the home page
  if (isSignedIn) {
    router.push("/");
  }

  return (
    <Card className="md:w-96">
      <CardHeader className="gap-4 flex-col items-start">
        <Typography level="h1" styling="h3">
          Sign in to your account
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
      <CardBody>
        <LoginForm id={LOGIN_FORM_ID} onFormSubmit={login} errors={errors} />
      </CardBody>

      <CardFooter className="grid grid-cols-1 gap-3 items-start">
        <Button
          form={LOGIN_FORM_ID}
          type="submit"
          color="primary"
          disabled={isLoading}
          className="w-full"
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Login
        </Button>
        <Link
          as={NextLink}
          href={ProjectUrls.forgotPassword}
          className="!justify-start"
        >
          Forgot password?
        </Link>
        <Typography level="p" styling="small">
          Don’t have an account yet?{" "}
          <Link as={NextLink} href={ProjectUrls.registration}>
            Register
          </Link>
        </Typography>
      </CardFooter>
    </Card>
  );
};
