import { z } from "zod";

export const modalFormSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be 3 or more characters long",
  }),
  category: z.object({
    name: z.string().min(1, {
      message: "Please select a category",
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

export type modalFormValues = z.infer<typeof modalFormSchema>;
