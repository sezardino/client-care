import { z } from "zod";

const passwordSchema = z.string({ required_error: "Password is required" });
const verificationCodeSchema = z
  .string({ required_error: "Code is required" })
  .length(6, "Code should have 6 digits");
const emailSchema = z
  .string({ required_error: "Email is required" })
  .email("Invalid email");

const baseAuthFields = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const RegistrationDtoSchema = baseAuthFields
  .and(z.object({ confirm: passwordSchema }))
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

export const VerificationDtoSchema = z.object({
  code: verificationCodeSchema,
});

export const PasswordResetDtoSchema = z.object({
  password: passwordSchema,
  code: verificationCodeSchema,
});

export const PasswordResetRequestDtoSchema = z.object({
  email: emailSchema,
});

export const LoginDtoSchema = baseAuthFields;

export type RegistrationDto = z.infer<typeof RegistrationDtoSchema>;
export type LoginDto = z.infer<typeof LoginDtoSchema>;
export type VerificationDto = z.infer<typeof VerificationDtoSchema>;
export type PasswordResetDto = z.infer<typeof PasswordResetDtoSchema>;
export type PasswordResetRequestDto = z.infer<
  typeof PasswordResetRequestDtoSchema
>;
