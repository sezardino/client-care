"use client";

import { ClerkAPIError } from "@clerk/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ComponentPropsWithoutRef } from "react";
import { useForm } from "react-hook-form";

import {
  PasswordResetRequestDto,
  PasswordResetRequestDtoSchema,
} from "@/dto/auth";
import { cn, Input } from "@nextui-org/react";
import { Form, FormField } from "../ui/form";
import { Typography } from "../ui/typography";

type PasswordResetRequestFormProps = ComponentPropsWithoutRef<"form"> & {
  onFormSubmit: (values: PasswordResetRequestDto) => void;
  errors: ClerkAPIError[];
};

export const PasswordResetRequestForm = (
  props: PasswordResetRequestFormProps
) => {
  const { onFormSubmit, errors, className, ...rest } = props;

  const form = useForm<PasswordResetRequestDto>({
    resolver: zodResolver(PasswordResetRequestDtoSchema),
  });

  const onSubmit = (data: PasswordResetRequestDto) => {
    onFormSubmit(data);
  };

  return (
    <Form {...form}>
      <form
        {...rest}
        className={cn("flex flex-col gap-3", className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <Input {...field} type="email" label="Email" placeholder="Email" />
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
