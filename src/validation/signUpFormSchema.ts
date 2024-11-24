import { z } from "zod";

export const signUpFormSchema = z
  .object({
    fullName: z
      .string()
      .min(5, {
        message: "Full name must be at least 5 characters long",
      })
      .includes(" ", {
        message: "Full name must contain at least 2 words",
      }),
    username: z
      .string()
      .min(2, {
        message: "Username must be at least 3 characters long",
      })
      .startsWith("@", {
        message: "Username must start with @",
      }),
    email: z.string().email({
      message: "Email isn't correctly written",
    }),
    image: z.string({
      required_error: "Image is required",
    }),
  })
  .extend({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
  
export type signUpFormValues = z.infer<typeof signUpFormSchema>;
