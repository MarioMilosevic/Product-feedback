import z, { ZodError } from "zod";

const passwordError = "Must be at least 8 characters";

export const signUpFormSchema = z
  .object({
    fullName: z
      .string()
      .min(5, {
        message: "Must be at least 5 characters",
      })
      .includes(" ", {
        message: "Must contain at least 2 words",
      }),
    username: z
      .string()
      .min(2, {
        message: "Must be at least 3 characters long",
      })
      .startsWith("@", {
        message: "Must start with @",
      }),
    email: z.string().email(),
    image: z.string({
      required_error: "Image is required",
    }),
  })
  .extend({
    password: z.string().min(8, { message: passwordError }),
    confirmPassword: z.string().min(8, { message: passwordError }),
  });

export const ConfirmSchema = signUpFormSchema
  .extend({
    password: z.string().min(8, { message: passwordError }),
    confirmPassword: z.string().min(8, { message: passwordError }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupSchema = z.infer<typeof signUpFormSchema>;
export type SignupFields = keyof SignupSchema;
export type SignupFieldErorrs = {
  [key in SignupFields]?: string;
};
export type SignupTouchedFields = {
  [key in SignupFields]?: boolean;
};

export function getFieldError<
  T extends SignupFields,
  K extends SignupSchema[T]
>(property: T, value: K) {
  const { error } = signUpFormSchema.shape[property].safeParse(value);
  if (!error) return;
  return error.issues[0]?.message;
}

export const getErrors = (error: ZodError) =>
  error.issues.reduce((all, issue) => {
    const path = issue.path.join("") as keyof SignupSchema;
    const message = all[path] ? all[path] + ", " : "";
    all[path] = message + issue.message;
    return all;
  }, {} as SignupFieldErorrs);
