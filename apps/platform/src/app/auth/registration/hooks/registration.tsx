import { RegistrationDto } from "@/dto/auth";
import { CustomError } from "@/types/base";
import { useSignUp } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";

export const useRegistrationMutation = () => {
  const { isLoaded, signUp } = useSignUp();

  const mutationFn = useCallback(
    async (values: RegistrationDto) => {
      if (!isLoaded) return;

      const { email, password } = values;

      try {
        await signUp.create({
          emailAddress: email,
          password,
        });

        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });
      } catch (err) {
        console.error(JSON.stringify(err, null, 2));
        if (isClerkAPIResponseError(err))
          throw { errors: err.errors.map((e) => ({ message: e.longMessage })) };
        throw { message: "Something went wrong when try to register new user" };
      }
    },
    [isLoaded, signUp]
  );

  return useMutation<
    void,
    CustomError | { errors: CustomError[] },
    RegistrationDto,
    unknown
  >({ mutationFn });
};
