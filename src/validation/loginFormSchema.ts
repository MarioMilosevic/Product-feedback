import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email({
    message: "Email isn't correctly written",
  }),
  password: z.string().min(8, {
    message: "Must be 8 characters long",
  }),
});

export type modalFormValues = z.infer<typeof loginFormSchema>;
