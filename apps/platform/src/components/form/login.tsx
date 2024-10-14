"use client";

import { ClerkAPIError } from "@clerk/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ComponentPropsWithoutRef } from "react";
import { useForm } from "react-hook-form";

import { LoginDto, LoginDtoSchema } from "@/dto/auth";
import { cn, Input } from "@nextui-org/react";
import { Form, FormField } from "../ui/form";
import { Typography } from "../ui/typography";

type LoginFormProps = ComponentPropsWithoutRef<"form"> & {
  onFormSubmit: (values: LoginDto) => void;
  errors?: ClerkAPIError[];
};

export const LoginForm = (props: LoginFormProps) => {
  const { errors, onFormSubmit, className, ...rest } = props;

  const form = useForm<LoginDto>({
    resolver: zodResolver(LoginDtoSchema),
  });

  const onSubmit = (data: LoginDto) => {
    onFormSubmit(data);
  };

  return (
    <Form {...form}>
      <form
        {...rest}
        className={cn("space-y-4 md:space-y-6", className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <Input {...field} type="email" label="Email" placeholder="Email" />
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <Input
              {...field}
              type="password"
              label="Password"
              placeholder="Password"
            />
          )}
        />

        {errors && (
          <ul>
            {errors.map((el, index) => (
              <li key={index}>
                <Typography level="span" className="text-red-400">
                  {el.longMessage}
                </Typography>
              </li>
            ))}
          </ul>
        )}
      </form>
    </Form>
  );
};
