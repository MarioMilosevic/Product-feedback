import z, { ZodError } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Must be at least 8 characters long",
  }),
});

export type LoginSchema = z.infer<typeof loginFormSchema>;
export type LoginFields = keyof LoginSchema;
export type LoginFieldErrors = {
  [key in LoginFields]?: string;
};
export type LoginTouchedFields = {
  [key in LoginFields]?: boolean;
};

export function getFieldError<T extends LoginFields, K extends LoginSchema[T]>(
  property: T,
  value: K
) {
  const { error } = loginFormSchema.shape[property].safeParse(value);
  return error
    ? error.issues.map((issue) => issue.message).join(", ")
    : undefined;
}

export const getErrors = (error: ZodError) =>
  error.issues.reduce((all, issue) => {
    const path = issue.path.join("") as keyof LoginSchema;
    const message = all[path] ? all[path] + ", " : "";
    all[path] = message + issue.message;
    return all;
  }, {} as LoginFieldErrors);
