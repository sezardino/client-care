import { setUserId } from "@/actions/users/set-user-id";
import { ProjectUrls } from "@/const/url";
import { VerificationDto } from "@/schemas/dto/auth";
import { CustomError } from "@/types/base";
import { useSignUp } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "sonner";

export const useRegistrationVerificationMutation = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const mutationFn = useCallback(
    async (values: VerificationDto) => {
      if (!isLoaded) return;

      const { code } = values;

      try {
        const completeSignUp = await signUp.attemptEmailAddressVerification({
          code,
        });

        if (completeSignUp.status !== "complete") {
          console.error(JSON.stringify(completeSignUp, null, 2));
          throw { message: "Something went wrong" };
        }

        await setUserId({
          email: completeSignUp.emailAddress!,
          id: completeSignUp.createdUserId!,
        });

        await setActive({ session: completeSignUp.createdSessionId });
      } catch (err) {
        console.error(JSON.stringify(err, null, 2));

        if (isClerkAPIResponseError(err))
          throw { errors: err.errors.map((e) => ({ message: e.longMessage })) };
        throw { message: "Something went wrong when try to register new user" };
      }
    },
    [isLoaded, setActive, signUp]
  );

  const onSuccess = useCallback(() => {
    toast.success("You are successfully registered in app");

    router.push(ProjectUrls.newOrganization);
  }, [router]);

  return useMutation<
    void,
    CustomError | { errors: CustomError[] },
    VerificationDto,
    unknown
  >({ mutationFn, onSuccess });
};
