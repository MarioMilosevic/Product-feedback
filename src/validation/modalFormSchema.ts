import z, { ZodError } from "zod";

export const modalFormSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be 3 or more characters long",
  }),
  category: z.object({
    name: z.string().min(1, {
      message: "Please select a status",
    }),
  }),
  status: z
    .object({
      name: z.string().min(1, {
        message: "Please select a status",
      }),
    })
    .optional(),
  description: z.string().min(5, {
    message: "Description must be at least 5 characters long",
  }),
});

export type ModalFormSchema = z.infer<typeof modalFormSchema>;
export type ModalFormFields = keyof ModalFormSchema;
export type ModalFormFieldErrors = {
  [key in ModalFormFields]?: string;
};
export type ModalTouchedFields = {
  [key in ModalFormFields]?: boolean;
};

export function getFieldError<
  T extends ModalFormFields,
  K extends ModalFormSchema[T]
>(property: T, value: K) {
  const { error } = modalFormSchema.shape[property].safeParse(value);
  return error
    ? error.issues.map((issue) => issue.message).join(", ")
    : undefined;
}

export const getErrors = (error: ZodError) =>
  error.issues.reduce((all, issue) => {
    const path = issue.path[0] as keyof ModalFormFieldErrors;
    const message = all[path] ? all[path] + ", " : "";
    all[path] = message + issue.message;
    return all;
  }, {} as ModalFormFieldErrors);
